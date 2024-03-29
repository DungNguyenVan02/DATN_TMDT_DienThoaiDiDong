const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		sold: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			default: 0,
		},
		discount: { type: Number, default: 0 },
		thumb: {
			type: String,
		},
		images: {
			type: Array,
		},
		color: {
			type: String,
		},
		ratings: [
			{
				star: { type: Number },
				postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
				comment: { type: String },
				date: { type: String },
				time: { type: String },
			},
		],
		totalRatings: {
			type: Number,
			default: 0,
		},
		version: Array,
		variants: [
			{
				sku: String,
				color: String,
				price: Number,
				thumb: String,
				sold: {
					type: Number,
					default: 0,
				},
				quantity: { type: Number, default: 0 },
				version: Array,
			},
		],
	},
	{
		timestamps: true,
	}
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
