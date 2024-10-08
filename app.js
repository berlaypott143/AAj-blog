const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const { api_key, api_user } = require("./config");

const app = express();
app.set("view engine", "ejs");

// connecting to database
const dbURI = `mongodb+srv://${api_user}:${api_key}@cluster0.sadt2.mongodb.net/aldrinDB?retryWrites=true&w=majority&appName=Cluster0`;
// Connect to the database
const connectDB = async () => {
	try {
		await mongoose.connect(dbURI);
		app.listen(3000);
		console.log("Connected to MongoDB Atlas");
	} catch (err) {
		console.error("Failed to connect to MongoDB", err);
	}
};

// Call the function to connect to the database and start the server
connectDB();

//Middleware & Static file
app.use(express.urlencoded({ extended: true })); // accepting form data
app.use(express.static("public"));
app.use(morgan("dev"));

// Blog Routes
app.use("/blogs", blogRoutes);

// redirect
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About Me" });
});

app.use((req, res) => {
	res.status(404).render("404", { title: "Not found!" });
});
