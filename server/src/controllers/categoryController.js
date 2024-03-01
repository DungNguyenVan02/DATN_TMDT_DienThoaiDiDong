const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const generateSlug = require("../utils/slugify");

class categoryController {
	// [GET] /
	getCategories = asyncHandler(async (req, res) => {
		const response = await Category.find();

		return res.status(200).json({
			success: response ? true : false,
			data: response,
			mes: response
				? "Lấy danh sách thành công!"
				: "Có lỗi xảy ra, vui lòng thử lại sau!",
		});
	});
	// [POST] /create
	createCategory = asyncHandler(async (req, res) => {
		const { name, brand } = req.body;

		if (!name || !brand) {
			throw new Error("Vui lòng nhập đầy đủ các trường");
		}

		const payload = {
			name,
			slug: generateSlug(name),
		};

		const convertBrand = brand.split(",");

		const response = await Category.create(payload);

		convertBrand.forEach((item) => {
			response.brand.push(item);
		});

		response.save();

		return res.json({
			success: response ? true : false,
			data: response,
			mes: response
				? "Thêm danh mục sản phẩm thành công"
				: "Có lỗi xảy ra, vui lòng thử lại sau!",
		});
	});

	// [PUT] /:cid
	updateCategory = asyncHandler(async (req, res) => {
		const { cid } = req.params;
		const { name, brand } = req.body;

		const convertBrand = brand.split(", ");

		const response = await Category.findByIdAndUpdate(
			cid,
			{ name, brand: [] },
			{ new: true }
		);

		convertBrand.forEach((item) => {
			response.brand.push(item);
		});

		response.save();

		return res.json({
			success: response ? true : false,
			data: response,
			mes: response
				? "Cập nhật danh mục sản phẩm thành công"
				: "Có lỗi xảy ra, vui lòng thử lại sau!",
		});
	});

	// [DELETE] /:cid
	deleteCategory = asyncHandler(async (req, res) => {
		const { cid } = req.params;

		const response = await Category.findByIdAndDelete(cid);

		return res.json({
			success: response ? true : false,
			data: response,
			mes: response
				? "Xóa danh mục sản phẩm thành công"
				: "Có lỗi xảy ra, vui lòng thử lại sau!",
		});
	});
}

module.exports = new categoryController();
