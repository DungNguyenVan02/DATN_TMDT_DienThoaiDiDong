const express = require("express");
require("dotenv").config();
const routes = require("./routes");
const cors = require("cors");

const db = require("./config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8888;

app.use(
	cors({
		origin: process.env.URL_CLIENT,
		methods: ["GET", "PUT", "POST", "DELETE"],
	})
);

app.use("/", (req, res) => {
	res.json("Hello world!");
});

routes(app);
// Connect to database
db.connect();

app.listen(port, () => {
	console.log("Server running on port: " + port);
});
