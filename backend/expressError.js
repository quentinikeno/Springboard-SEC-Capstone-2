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

/** 404 NOT FOUND error. */

class NotFoundError404 extends ExpressError {
	constructor(message = "Not Found.") {
		super(message, 404);
	}
}

/** 401 UNAUTHORIZED error. */

class UnauthorizedError401 extends ExpressError {
	constructor(
		message = "You are currently unauthorized.  Please log in first."
	) {
		super(message, 401);
	}
}

/** 400 BAD REQUEST error. */

class BadRequestError400 extends ExpressError {
	constructor(message = "Bad Request.") {
		super(message, 400);
	}
}

/** 403 BAD REQUEST error. */

class ForbiddenError403 extends ExpressError {
	constructor(message = "You aren't allowed to access this page.") {
		super(message, 403);
	}
}

module.exports = {
	ExpressError,
	NotFoundError404,
	UnauthorizedError401,
	BadRequestError400,
	ForbiddenError403,
};
