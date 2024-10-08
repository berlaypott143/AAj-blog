const mongoose = require("mongoose");
const Schema = mongoose.Schema; // to define the structure of docs in the collection

// defining the structure of Schema
const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		snippet: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema); // putting schema in a variable

module.exports = Blog;
