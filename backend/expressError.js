class ExpressError extends Error {
	/** This class let's us customize our errors for the API.*/
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
		console.error(this.stack);
	}
}

/** Additional errors */

class NotFoundError404 extends ExpressError {
	constructor(message = "Not Found.") {
		super(message, 404);
	}
}

class UnauthorizedError401 extends ExpressError {
	constructor(
		message = "You are currently unauthorized.  Please log in first."
	) {
		super(message, 401);
	}
}

class BadRequestError400 extends ExpressError {
	constructor(message = "Bad Request.") {
		super(message, 400);
	}
}

class ForbiddenError403 extends ExpressError {
	constructor(message = "You aren't allowed to access this page.") {
		super(message, 403);
	}
}

class ConflictError409 extends ExpressError {
	constructor(message = "There is a conflict with the request.") {
		super(message, 409);
	}
}

module.exports = {
	ExpressError,
	NotFoundError404,
	UnauthorizedError401,
	BadRequestError400,
	ForbiddenError403,
	ConflictError409,
};
