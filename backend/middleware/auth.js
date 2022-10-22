"use strict";

/** Middleware to help with auth and JWTs in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError401, ForbiddenError403 } = require("../expressError");

/** Authenticate user's JWT.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals.
 */

function authenticateJWT(req, res, next) {
	try {
		const authHeader = req.headers && req.headers.authorization;
		if (authHeader) {
			const token = authHeader.replace(/^[Bb]earer /, "").trim(); //remove "bearer" and any extra spaces
			res.locals.user = jwt.verify(token, SECRET_KEY);
		}
		return next();
	} catch (error) {
		return next(error);
	}
}

/** Check if a user's token is there and are logged in. */

function ensureLoggedIn(req, res, next) {
	try {
		if (!res.locals.user) throw new UnauthorizedError401();
		return next();
	} catch (error) {
		return next(error);
	}
}

/** Middleware to check if a user is a permitted user for a route. */

function ensurePermittedUser(req, res, next) {
	try {
		if (res.locals.user.username !== req.params.username)
			throw new ForbiddenError403();
		return next();
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	authenticateJWT,
	ensureLoggedIn,
	ensurePermittedUser,
};
