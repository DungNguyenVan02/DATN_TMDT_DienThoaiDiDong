const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
	{
		avatar: String,
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		address: Array,
		role: {
			type: Number,
			default: 11,
		},
		cart: [
			{
				product: { type: mongoose.Types.ObjectId, ref: "Product" },
				thumbnail: String,
				quantity: Number,
				color: String,
				price: Number,
			},
		],
		wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
		isBlocked: {
			type: Boolean,
			default: false,
		},
		refreshToken: {
			type: String,
		},
		passwordResetExpires: {
			type: Date,
		},

		registerTokenExpires: {
			type: Date,
		},

		codeVerified: {
			type: String,
			default: null,
		},

		codeForgotPassword: {
			type: String,
			default: null,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

//Export the model
module.exports = mongoose.model("User", userSchema);
