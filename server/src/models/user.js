const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
		passwordResetExpires: {
			type: Date,
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

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = bcrypt.genSaltSync(+process.env.SALT);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isCorrectPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

//Export the model
module.exports = mongoose.model("User", userSchema);
