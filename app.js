const express = require("express");
const path = require("path");
const morgan = require("morgan");
const pug = require("pug");
const compression = require("compression");

const port = process.env.PORT || 3000;

require("dotenv").config();

// app internal setup
let app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(morgan("dev"));

app.use(compression());

app.get("/health", (req, res) => {
	res.send("I am happy and healthy\n");
});

app.use("/", require("./routes"));

// error catching
app.use((req, res, next) => {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});
if (app.get("env") === "development") {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.send("error: " + err.message + " | " + err);
	});
}
app.use((err, req, res, next) => {
	res.status(err.status || 404);
	// log the error for heroku logs
	console.log("error", err);
	res.render("error", {});
});

// serve the app on PORT variable
let server = app.listen(port, err => {
	if (err) console.log("App listening error ", err);
	else console.log("App running at ", port);
});
