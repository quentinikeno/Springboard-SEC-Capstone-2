/** Express app for math games API. */

const express = require("express");
const app = express();
const { NotFoundError404 } = require("./expressError");
const morgan = require("morgan");
const helmet = require("helmet");

/** Middleware */
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

//** Routes */
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

/** 404 handler */
app.use((req, res, next) => {
	const error = new NotFoundError404();
	return next(error);
});

/** General error handler */
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	return res.json({ error, message: error.message });
});

module.exports = app;
