const User = require("../controllers/userController");
const asyncHandler = require("express-async-handler");

class UserController {
	register = asyncHandler(async (req, res) => {
		const { email, password, fullName, phone } = req.body;
		if (!email || !password || !fullName || !phone) {
			throw new Error("Missing input");
		}
	});
}

module.exports = new UserController();
