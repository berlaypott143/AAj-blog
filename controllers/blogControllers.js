const Blog = require("../models/blog.js");

// GET all blogs - Display on index page
const blog_index = async (req, res) => {
	try {
		const blogs = await Blog.find().sort({ createdAt: -1 });
		res.render("index", { title: "All blogs", blogs });
	} catch (error) {
		console.log(error);
		res.render(500).send("An error occurred while fetching blogs");
	}
};

// GET specific blog by ID - Display on details page
const blog_details = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await Blog.findById(id);
		res.render("details", { blog: result, title: "Blog details" });
	} catch (error) {
		res.status(404).render("404", { title: "Sorry, Blog not found" });
	}
};

// GET request for blog creation form
const blog_create_get = async (req, res) => {
	try {
		res.render("create", { title: "Create new blog" });
	} catch (error) {
		console.log(error);
	}
};

// POST request to create a new blog
const blog_create_post = async (req, res) => {
	try {
		const blog = new Blog(req.body);
		await blog.save();
		res.redirect("/blogs");
	} catch (error) {
		console.error("Error saving blog:", error);
		res.status(500).send("Internal Server Error");
	}
};

const blog_delete = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await Blog.findByIdAndDelete(id);
		res.json({ redirect: "/blogs" });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	blog_index,
	blog_details,
	blog_create_get,
	blog_create_post,
	blog_delete,
};
