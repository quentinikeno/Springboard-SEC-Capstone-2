/** Express app for math games API. */

const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");

const { NotFoundError404 } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const friendsRoutes = require("./routes/friends");
const gamesRoutes = require("./routes/games");
const scoresRoutes = require("./routes/scores");
const challengesRoutes = require("./routes/challenges");

/** Middleware */
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(authenticateJWT);

//** Routes */
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/friends", friendsRoutes);
app.use("/games", gamesRoutes);
app.use("/scores", scoresRoutes);
app.use("/challenges", challengesRoutes);

/** 404 handler */
app.use((req, res, next) => {
	const error = new NotFoundError404();
	return next(error);
});

/** General error handler */
app.use((error, req, res, next) => {
	const status = error.status || 500;
	const message = error.message;

	return res.status(status).json({ error: { message, status } });
});

module.exports = app;
