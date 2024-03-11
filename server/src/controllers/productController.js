const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const generateSlug = require("../utils/slugify");

class productController {
	// [GET] /products
	getProducts = asyncHandler(async (req, res) => {
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
				{ name: { $regex: queries.q, $options: "i" } },
				{ category: { $regex: queries.q, $options: "i" } },
				{ brand: { $regex: queries.q, $options: "i" } },
			];
		}

		let colorQueryObj = {};
		if (queries?.color) {
			delete formatQuery.color;
			const colorArr = queries.color?.split(",");
			const colorQuery = colorArr.map((el) => ({
				color: { $regex: el, $options: "i" },
			}));
			colorQueryObj = { $or: colorQuery };
		}

		let brandQueryObj = {};
		if (queries?.brand) {
			delete formatQuery.brand;
			const brandArr = queries.brand?.split(",");
			const brandQuery = brandArr.map((el) => ({
				brand: { $regex: el, $options: "i" },
			}));
			brandQueryObj = { $or: brandQuery };
		}

		let categoryQueryObj = {};
		if (queries?.category) {
			delete formatQuery.category;
			const categoryArr = queries.category?.split(",");
			const categoryQuery = categoryArr.map((el) => ({
				category: { $regex: el, $options: "i" },
			}));
			categoryQueryObj = { $or: categoryQuery };
		}

		const q = {
			...categoryQueryObj,
			...brandQueryObj,
			...colorQueryObj,
			...formatQuery,
		};

		let queryCommand = Product.find(q);

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
			const counts = await Product.find(q).countDocuments();
			return res.status(200).json({
				success: response ? true : false,
				counts,
				products: response ? response : "Lấy danh sachs thất bại",
			});
		});
	});

	// [GET] /product/:pid
	getProduct = asyncHandler(async (req, res) => {
		const { pid } = req.params;
		const response = await Product.findById(pid);
		return res.status(200).json({
			success: response ? true : false,
			data: response,
			mes: response ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thất bại",
		});
	});

	// [POST] /create
	createProduct = asyncHandler(async (req, res) => {
		const {
			name,
			category,
			brand,
			description,
			version,
			quantity = 0,
			price = 0,
			discount = 0,
		} = req.body;

		if (!name || !description || !brand || !category || !version) {
			throw new Error("Vui lòng nhập đầy đủ các trường!");
		}

		const slug = generateSlug(name);

		const payload = {
			name,
			description,
			quantity,
			price,
			discount,
			slug,
			brand,
			category,
		};

		const thumb = req?.files?.thumb[0]?.path;
		const images = req.files?.images?.map((el) => el.path);

		if (thumb) {
			payload.thumb = thumb;
		}

		if (images) {
			payload.images = images;
		}

		const convertVersion = version.split(", ");

		const response = await Product.create(payload);

		convertVersion.forEach((item) => {
			response.version.push(item);
		});

		response.save();

		if (response) {
			return res.status(200).json({
				success: true,
				data: response,
				mes: "Sản phẩm đã được tạo thành công!",
			});
		} else {
			return res.json({
				success: false,
				mes: "có lỗi xảy ra, vui lòng thử lại sau!",
			});
		}
	});

	// [PUT] /:pid
	updateProduct = asyncHandler(async (req, res) => {
		const { pid } = req.params;
		const { name, price, description, category, brand, quantity, color } =
			req.body;
		if (
			!name ||
			!price ||
			!description ||
			!category ||
			!brand ||
			!quantity ||
			!color
		) {
			throw new Error("Missing inputs");
		}
		const files = req?.files;

		if (files?.thumb) req.body.thumb = files?.thumb[0].path;
		if (Array.isArray(req.body?.initImages)) {
			if (files?.images) {
				const imagesUpdate = files?.images?.map((el) => el.path);

				req.body.images = req.body?.initImages.concat(imagesUpdate);
			} else {
				req.body.images = req.body?.initImages;
			}
		} else if (typeof req.body?.initImages === "string") {
			if (files?.images) {
				const payload = [req.body?.initImages];

				const imagesUpdate = files?.images?.map((el) => el.path);
				for (let i of imagesUpdate) {
					payload.push(i);
				}
				req.body.images = payload;
			} else {
				req.body.images = req.body?.initImages;
			}
		} else {
			req.body.images = files?.images?.map((el) => el.path);
		}

		if (name) {
			req.body.slug = slugify(name);
		}
		const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
			new: true,
		});

		return res.status(200).json({
			success: updatedProduct ? true : false,
			productsData: updatedProduct
				? updatedProduct
				: "Có lỗi xảy ra, vui lòng thử lại sau",
		});
	});

	// [DELETE] /:pid
	deleteProduct = asyncHandler(async (req, res) => {
		const { pid } = req.params;
		const deletedProduct = await Product.findByIdAndDelete(pid);
		return res.status(200).json({
			success: deletedProduct ? true : false,
			deletedProduct: deletedProduct
				? deletedProduct
				: "có lỗi xảy ra, vui lòng thử lại sau!",
		});
	});

	// [PUT] /ratings
	ratingsProduct = asyncHandler(async (req, res) => {
		const { _id } = req.user;
		const { star, comment, pid, date, time } = req.body;
		if (!star || !pid || !comment) {
			throw new Error("Missing inputs");
		}

		const productRating = await Product.findById(pid);
		const alreadyRating = productRating.ratings.find(
			(el) => el.postedBy.toString() === _id
		);
		if (alreadyRating) {
			// update star && comments
			await Product.updateOne(
				{
					ratings: { $elemMatch: alreadyRating },
				},
				{
					$set: {
						"ratings.$.star": star,
						"ratings.$.comment": comment,
						"ratings.$.date": date,
						"ratings.$.time": time,
					},
				},
				{ new: true }
			);
		} else {
			// Add star && comments
			await Product.findByIdAndUpdate(
				pid,
				{
					$push: {
						ratings: {
							star,
							postedBy: _id,
							comment,
							date,
							time,
						},
					},
				},
				{ new: true }
			);
		}

		// Tính trung bình số sao sản phẩm
		const productUpdateRate = await Product.findById(pid);
		const sumRating = productUpdateRate.ratings.length;
		const sumStars = productUpdateRate.ratings.reduce(
			(total, element) => total + parseInt(element.star),
			0
		);
		productUpdateRate.totalRatings = (
			(sumStars * 10) /
			sumRating /
			10
		).toFixed(1);
		await productUpdateRate.save();

		return res.status(200).json({
			success: true,
			productUpdateRate,
		});
	});

	// [PUT] /variants/:pid
	addVariantsProduct = asyncHandler(async (req, res) => {
		const { pid } = req.params;
		const { color, price, quantity } = req.body;

		const thumb = req?.files?.thumb[0]?.path;

		if (!color || !price || !thumb) {
			throw new Error("Missing input");
		}
		const response = await Product.findByIdAndUpdate(
			pid,
			{
				$push: {
					variants: {
						sku: uuid(),
						color,
						price,
						thumb,
						quantity,
					},
				},
			},
			{ new: true }
		);
		return res.status(200).json({
			success: response ? true : false,
			variantsProduct: response
				? response
				: "Cannot add variants product",
		});
	});

	// [PUT] /update-sold
	updateSold = asyncHandler(async (req, res) => {
		const { arrProduct } = req.body;
		if (!arrProduct) throw new Error("Missing inputs");

		arrProduct.forEach(async (product) => {
			const productUpdate = await Product.findByIdAndUpdate(
				product.pid,
				{
					$inc: { sold: product.quantity },
				},
				{ new: true }
			);
			return res.status(200).json({
				success: product ? true : false,
				mes: productUpdate
					? "Update sold successfully"
					: "Cannot find product in cart",
			});
		});
	});
}

module.exports = new productController();
