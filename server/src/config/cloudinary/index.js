const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

// SET STORAGE
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "DATN");
	},
	filename: function (req, file, cb) {
		cb(null, file.images + "-" + Date.now());
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
