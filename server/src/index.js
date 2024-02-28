const express = require("express");
require("dotenv").config();
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./config/db");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8888;

app.use(
	cors({
		origin: process.env.URL_CLIENT,
		methods: ["GET", "PUT", "POST", "DELETE"],
	})
);

routes(app);
// Connect to database
db.connect();

app.listen(port, () => {
	console.log("Server running on port: " + port);
});
