/** Express app for math games API. */

const express = require("express");
const app = express();
const ExpressError = require("./expressError");
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("dev"));

//** Routes */
const userRoutes = require("./routes/user");

/** 404 handler */

app.use((req, res, next) => {
	const error = new ExpressError("Not Found", 404);
	return next(error);
});

/** General error handler */
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	return res.json({ error, message: error.message });
});

module.exports = app;
