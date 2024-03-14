const User = require("../models/User");
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
		const queries = { ...req.query };
		// Tách trường đặc biệt trên query
		const excludeFields = ["page", "sort", "limit", "fields"];
		// format lại các operators cho đúng cú pháp mongoose
		excludeFields.forEach((field) => delete queries[field]);

		let queryString = JSON.stringify(queries);
		queryString = queryString.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(matchedEl) => {
				return `$${matchedEl}`;
			}
		);
		const formatQuery = JSON.parse(queryString);

		// Filtering
		if (queries?.q) {
			delete formatQuery.q;
			formatQuery["$or"] = [
				{ fullName: { $regex: queries.q, $options: "i" } },
				{ phone: { $regex: queries.q, $options: "i" } },
			];
		}

		const q = {
			...formatQuery,
		};

		let queryCommand = User.find(q);

		// Sorting
		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			queryCommand = queryCommand.sort(sortBy);
		}

		// Fields limiting
		if (req.query.fields) {
			const fields = req.query.fields.split(",").join(" ");
			queryCommand = queryCommand.select(fields);
		}
		// Pagination
		// limit: số object lấy về trong 1 lần gọi api
		// skip: số trang muốn bỏ qua
		const page = +req.query.page || 1;
		const limit = +req.query.limit || process.env.LIMIT;
		const skip = (page - 1) * limit;
		queryCommand.skip(skip).limit(limit);

		// execute query
		queryCommand.exec(async (err, response) => {
			if (err) throw new Error(err.message);
			const counts = await User.find(q).countDocuments();
			return res.status(200).json({
				success: response ? true : false,
				counts,
				data: response ? response : "Lấy danh sách thất bại",
			});
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
				fullName,
				phone,
				password,
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
		const { email, password, codeForgotPassword } = req.body;
		const user = await User.findOne({
			email,
			codeForgotPassword,
			passwordResetExpires: { $gt: Date.now() },
		});

		if (!user) {
			throw new Error(
				"Mã xác thực không hợp lệ hoặc đã hết hạn, vui lòng kiểm tra lại"
			);
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

	// [PUT] /update-info
	updateInfo = asyncHandler(async (req, res) => {
		const { _id } = req.user;
		const { fullName } = req.body;
		const payload = {};

		if (fullName) {
			payload.fullName = fullName;
		}
		if (req.file) {
			payload.avatar = req.file.path;
		}

		const user = await User.findByIdAndUpdate(_id, payload, { new: true });

		if (user) {
			return res.status(200).json({
				success: true,
				mes: "Update thông tin thành công!",
			});
		} else {
			return res.json({
				success: false,
				mes: "Update thông tin thất bại, vui lòng thử lại sau!",
			});
		}
	});

	// [POST] /logout
	deleteUser = asyncHandler(async (req, res) => {
		const { uid } = req.params;
		console.log(uid);
		if (!uid) {
			throw new Error("Missing input");
		}

		const response = await User.findByIdAndDelete(uid);

		return res.status(200).json({
			success: response ? true : false,
			mes: "Xóa thành công",
		});
	});

	// [PUT] /:uid
	updateUserByAdmin = asyncHandler(async (req, res) => {
		const { uid } = req.params;
		const { isBlocked } = req.body;

		if (!uid) {
			throw new Error("Missing inputs");
		}
		const response = await User.findByIdAndUpdate(
			uid,
			{ isBlocked },
			{
				new: true,
			}
		).select("-refreshToken -password -role");
		return res.status(200).json({
			success: response ? true : false,
			dataUpdate: response,
			updatedUser: response
				? "Cập nhật thông tin người dùng thành công!"
				: "Có lỗi xảy ra, vui lòng thử lại sau!",
		});
	});

	// [PUT] /update-address
	updateAddress = asyncHandler(async (req, res) => {
		const { _id } = req.user;
		const { address } = req.body;

		const listAddress = await User.findById(_id).select("address");

		const isExsited = listAddress.some((item) => item === address);

		if (isExsited) {
			throw new Error("Địa chỉ đã tồn tại!");
		} else {
			const response = await User.findByIdAndUpdate(
				_id,
				{ $push: { address } },
				{
					new: true,
				}
			).select("-refreshToken -password -role");
			return res.status(200).json({
				success: response ? true : false,
				mes: response
					? "Địa chỉ đã được thêm"
					: "Có lỗi xảy ra vui lòng thủ lại sau",
			});
		}
	});

	// [PUT] /delete-address/:nad
	deleteAddress = asyncHandler(async (req, res) => {
		const { _id } = req.user;

		const { nad } = req.params;

		const listAddress = await User.findById(_id).select("address");
		const isExsited = listAddress.some((item) => item === nad);

		if (isExsited) {
			const response = await User.findByIdAndUpdate(
				_id,
				{ $pull: { address } },
				{
					new: true,
				}
			).select("-refreshToken -password -role");
			return res.status(200).json({
				success: response ? true : false,
				mes: response
					? "Địa chỉ đã được thêm"
					: "Có lỗi xảy ra vui lòng thủ lại sau",
			});
		} else {
			throw new Error("Địa chỉ không tồn tại trên hệ thống");
		}
	});

	// [PUT] /update-cart
	updateCart = asyncHandler(async (req, res) => {
		const { _id } = req.user;
		const { pid, quantity = 1, color, thumbnail } = req.body;

		const cartUser = await User.findById(_id).select("cart");

		const alreadyUser = cartUser?.cart?.find(
			(el) =>
				el.product.toString() === pid && el.color.toString() === color
		);

		if (alreadyUser) {
			const response = await User.updateOne(
				{ cart: { $elemMatch: alreadyUser } },
				{
					$set: {
						"cart.$.quantity": alreadyUser.quantity + quantity,
						"cart.$.price": price,
						"cart.$.thumbnail": thumbnail,
					},
				},
				{ new: true }
			);

			return res.status(200).json({
				success: response ? true : false,
				mes: response
					? "Cập nhật giỏ hàng thành công!"
					: "Có lỗi xảy ra, vui lòng thử lại sau!",
			});
		} else {
			const response = await User.findByIdAndUpdate(
				_id,
				{
					$push: {
						cart: {
							product: pid,
							quantity,
							color,
							price,
							thumbnail,
						},
					},
				},
				{ new: true }
			);

			return res.status(200).json({
				success: response ? true : false,
				mes: response
					? "Cập nhật giỏ hàng thành công!"
					: "Có lỗi xảy ra, vui lòng thử lại sau!",
			});
		}
	});

	// [PUT] /update-quantity
	updateQuantityCart = asyncHandler(async (req, res) => {
		const { _id } = req.user;
		const { pid } = req.params;
		const { color, quantity } = req.body;
		if (!pid || !color || !quantity) throw new Error("Missing inputs");
		const cartUser = await User.findById(_id).select("cart");
		const alreadyUser = cartUser?.cart?.find(
			(el) =>
				el.product.toString() === pid && el.color.toString() === color
		);
		if (alreadyUser) {
			const response = await User.updateOne(
				{ cart: { $elemMatch: alreadyUser } },
				{
					$set: {
						"cart.$.quantity": quantity,
					},
				},
				{ new: true }
			);

			return res.status(200).json({
				success: response ? true : false,

				mes: response
					? "Cập nhật giỏ hàng thành công!"
					: "Có lỗi xảy ra, vui lòng thử lại sau!",
			});
		}

		return res.status(200).json({
			success: true,
			mes: "Cannot find product in cart",
		});
	});

	// [DELETE] /remove-cart
	removeCart = asyncHandler(async (req, res) => {
		const { _id } = req.user;
		const { arrUser } = req.body;
		if (!arrUser) throw new Error("Missing inputs");

		const response = await User.findByIdAndUpdate(
			_id,
			{
				$pull: {
					cart: { _id: { $in: [...arrUser] } },
				},
			},
			{ new: true }
		);
		return res.status(200).json({
			success: response ? true : false,
			mes: response
				? "Sản phẩm đã được xóa khỏi giỏ hàng!"
				: "Có lỗi xảy ra, vui lòng thử lại sau!",
		});
	});

	// [PUT] /wishlist/:pid
	wishList = asyncHandler(async (req, res) => {
		const { _id } = req.user;
		const { pid } = req.params;

		const user = await User.findById(_id);

		const alreadyWishlist = await user?.wishlist?.find(
			(wid) => wid.toString() === pid
		);
		if (alreadyWishlist) {
			const response = await User.findByIdAndUpdate(
				_id,
				{
					$pull: { wishlist: pid },
				},
				{ new: true }
			);

			return res.status(200).json({
				success: response ? true : false,
				mes: response
					? "Cập nhật thành công!"
					: "Có lỗi xảy ra, vui lòng thử lại sau!",
			});
		} else {
			const response = await User.findByIdAndUpdate(
				_id,
				{
					$push: { wishlist: pid },
				},
				{ new: true }
			);

			return res.status(200).json({
				success: response ? true : false,
				mes: response
					? "Cập nhật thành công!"
					: "Có lỗi xảy ra, vui lòng thử lại sau!",
			});
		}
	});
}

module.exports = new UserController();
