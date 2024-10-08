const express = require("express");
const blogController = require("../controllers/blogControllers");

const router = express.Router();

// blog routes (METHODS)
router.get("/", blogController.blog_index);

// Creating new blog
router.post("/", blogController.blog_create_post);

// Redirecting
router.get("/create", blogController.blog_create_get);

// Getting each id in the database and sending to the browser
router.get("/:id", blogController.blog_details);

// Delete blogs form database and redirecting to the current blogs
router.delete("/:id", blogController.blog_delete);

module.exports = router;
