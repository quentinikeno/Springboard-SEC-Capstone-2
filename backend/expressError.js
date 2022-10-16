class ExpressError extends Error {
	/** This class let's us customize our errors for the API.
	 * Used as part of the error-handling middleware.*/
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
		console.error(this.stack);
	}
}

module.exports = ExpressError;
