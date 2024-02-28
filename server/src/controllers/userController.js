const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");
const sendMail = require("../utils/senMail");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../middlewares/jwt");

//Hàm xóa các toàn khoản không xác thực
const scheduleAccountCleanup = () => {
	cron.schedule("*/60 * * * *", async () => {
		try {
			const expiredUsers = await User.find({
				isVerified: false,
				registerTokenExpires: { $lt: new Date() },
			});
			console.log(expiredUsers);
			if (expiredUsers.length > 0) {
				for (const user of expiredUsers) {
					await User.findByIdAndDelete(user._id);
				}
			}
		} catch (error) {
			console.error("Lỗi khi xóa tài khoản hết hạn:", error);
		}
	});
};

class UserController {
	// [GET] /
	getUsers = asyncHandler(async (req, res) => {
		const response = await User.find();
		return res.status(200).json({
			success: response ? true : false,
			data: response,
			mes: response
				? "Lấy danh sách user thành công"
				: "Có lỗi xảy ra, vui lòng thử lại sau!",
		});
	});

	// [GET] /current
	getUser = asyncHandler(async (req, res) => {
		const { _id } = req.user;
		const response = await User.findById(_id);
		return res.status(200).json({
			success: response ? true : false,
			data: response,
			mes: response
				? "Lấy thông tin user thành công"
				: "Có lỗi xảy ra, vui lòng thử lại sau!",
		});
	});

	// [POST] /register
	register = asyncHandler(async (req, res) => {
		const { fullName, phone, email, password } = req.body;
		if (!fullName || !phone || !email || !password) {
			return res.status(403).json({
				success: false,
				mes: "Missing required fields",
			});
		}

		await User.deleteOne({ phone, isVerified: false });

		const user = await User.findOne({ email, phone });
		if (user) {
			throw new Error("User has existed!");
		} else {
			const emailToken = await jwt.sign(
				{ email },
				process.env.JWT_SECRET,
				{
					expiresIn: "59m",
				}
			);

			let codeRand;

			codeRand = Math.floor(Math.random() * 90000) + 10000;

			const verificationExpires = new Date();
			verificationExpires.setMinutes(
				verificationExpires.getMinutes() + 59
			);

			const codeVerified = await User.find({
				codeVerified: { $ne: null },
			});

			let isExsitedCode = codeVerified.find(
				(item) => item.codeVerified === codeRand
			);
			do {
				codeRand = Math.floor(Math.random() * 90000) + 10000;
				isExsitedCode = codeVerified.find(
					(item) => item.codeVerified === codeRand
				);
			} while (isExsitedCode);

			const useTemp = await User.create({
				...req.body,
				email: emailToken,
				codeVerified: codeRand,
				registerTokenExpires: verificationExpires,
			});

			const html = `<h3>Mã xác thực tài khoản của bạn là: </br><blockquote>${codeRand}</blockquote></h3> </br><h3>Mã xác thực chỉ có hiệu lực 60 phút tính từ khi nhận</h3>`;

			const rs = await sendMail({
				email,
				html,
				subject: "Hoàn tất đăng ký tài khoản",
			});

			scheduleAccountCleanup();

			return res.json({
				success: rs.response?.includes("OK") ? true : false,
				useTemp: useTemp,
				mes: rs.response?.includes("OK")
					? "Vui lòng, kiểm tra email để xác thực tài khoản"
					: "Có lỗi xảy ra, vui lòng thử lại sau!",
			});
		}
	});

	// [POST] /completed
	completed = asyncHandler(async (req, res) => {
		const { codeVerified } = req.body;

		const user = await User.findOne({
			codeVerified: codeVerified,
			registerTokenExpires: { $gt: new Date() },
		});

		if (user !== null) {
			const emailDecode = await jwt.verify(
				user.email,
				process.env.JWT_SECRET
			);
			const response = await User.findByIdAndUpdate(
				user?._id,
				{
					email: emailDecode.email,
					isVerified: true,
					codeVerified: null,
				},
				{ new: true }
			);
			return res.json({
				success: response ? true : false,
				mes: response
					? "Tạo thành công tài khoản"
					: "Có lỗi xảy ra, vui lòng thử lại sau",
			});
		} else {
			await User.deleteOne({ codeVerified });
			return res.json({
				success: false,
				mes: "Có lỗi xảy ra, vui lòng thử lại sau",
			});
		}
	});

	// [POST] /login
	login = asyncHandler(async (req, res) => {
		const { email, password } = req.body;
		if (!email || !password) {
			throw new Error("Missing input");
		}

		const response = await User.findOne({ email: email });

		if (!response) {
			throw new Error("Email chưa được đăng ký, vui lòng kiểm tra lại!");
		}

		if (response.isBlocked) {
			throw new Error(
				"Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!"
			);
		}

		if (await response.isCorrectPassword(password)) {
			const accessToken = generateAccessToken(
				response._id,
				response.role
			);
			const refreshToken = generateRefreshToken(response._id);

			await User.findByIdAndUpdate(
				response._id,
				{ refreshToken },
				{
					new: true,
				}
			);

			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
			});

			return res.status(200).json({
				success: true,
				accessToken: accessToken,
				user: response,
			});
		} else {
			throw new Error("Tài khoản hoặc mật khẩu không chính xác!");
		}
	});

	// [POST] /logout
	logout = asyncHandler(async (req, res) => {
		const cookie = req.cookies;
		if (!cookie || !cookie.refreshToken) {
			throw new Error("Invalid refresh token in cookies");
		}
		// Xóa refresh token ở db
		await User.findOneAndUpdate(
			{ refreshToken: cookie.refreshToken },
			{ refreshToken: "" },
			{ new: true }
		);

		// Xóa refresh token
		res.clearCookie("refreshToken", { httpOnly: true, secure: true });

		return res.status(200).json({
			success: true,
			mes: "Đăng xuất thành công",
		});
	});

	// [POST] /refresh-token
	refreshAccessToken = asyncHandler(async (req, res) => {
		// get token from cookie
		const cookie = req.cookies;
		if (!cookie && !cookie.refreshToken) {
			throw new Error("Invalid refresh token in cookies");
		}
		const rs = await jwt.verify(cookie.refreshToken, process.env.KEY_JWT);

		const response = await User.findOne({
			_id: rs._id,
			refreshToken: cookie.refreshToken,
		});

		return res.status(200).json({
			success: response ? true : false,
			newAccessToken: response
				? generateAccessToken(response._id, response.role)
				: "Refresh token not matched",
		});
	});

	// [POST] /forgot-password
	forgotPassword = asyncHandler(async (req, res) => {
		const { email } = req.body;

		if (!email) {
			throw new Error("Missing email");
		}

		const user = await User.findOne({ email: email });

		if (!user) {
			throw new Error(
				"Email chưa được đăng ký tại hệ thống, vui lòng kiểm tra lại"
			);
		}

		let codeRand;

		codeRand = Math.floor(Math.random() * 90000) + 10000;

		const passwordResetExpires = new Date();
		passwordResetExpires.setMinutes(passwordResetExpires.getMinutes() + 15);

		const codeForgotPassword = await User.find({
			codeForgotPassword: { $ne: null },
		});

		let isExsitedCode = codeForgotPassword.find(
			(item) => item.codeForgotPassword === codeRand
		);
		do {
			codeRand = Math.floor(Math.random() * 90000) + 10000;
			isExsitedCode = codeForgotPassword.find(
				(item) => item.codeForgotPassword === codeRand
			);
		} while (isExsitedCode);

		const html = `<h3>Mã xác thực tài khoản của bạn là: </br><blockquote>${codeRand}</blockquote></h3> </br> <h3>Mã này chỉ có hiệu lực 15 phút kể từ lúc nhận</h3>`;

		const data = {
			email,
			html,
			subject: "Forgot password",
		};

		(user.codeForgotPassword = codeRand),
			(user.passwordResetExpires = passwordResetExpires),
			await user.save();

		const rs = await sendMail(data);
		return res.status(200).json({
			success: true,
			mes: rs.response?.includes("OK")
				? "Vui lòng kiểm tra email của bạn để xác nhận"
				: "Có lỗi xảy ra, vui lòng thử lại sau!",
		});
	});

	// [PUT] /reset-password
	resetPassword = asyncHandler(async (req, res) => {
		const { password, codeForgotPassword } = req.body;
		const user = await User.findOne({
			codeForgotPassword,
			passwordResetExpires: { $gt: Date.now() },
		});

		if (!user) {
			throw new Error("Invalid reset token");
		}

		user.password = password;
		user.passwordChangeAt = Date.now();
		user.codeForgotPassword = undefined;
		user.passwordResetExpires = undefined;
		await user.save();
		return res.status(200).json({
			success: user ? true : false,
			mes: user ? "Updated password" : "Something went wrong",
		});
	});
}

module.exports = new UserController();
