"use strict";

/** Middleware to help with validation of JSON schemas. */

const jsonschema = require("jsonschema");
const { BadRequestError400 } = require("../expressError");

/** validateSchema
 * accepts request object, JSON schema to use, and the error to throw.
 * if the if the validator cannot validate the request body with the schema throw an error.
 */

function validateSchema(req, schema, error = BadRequestError400) {
	const validator = jsonschema.validate(req.body, schema);
	if (!validator.valid) {
		const errors = validator.errors.map((e) => e.stack);
		throw new error(errors);
	}
}

module.exports = validateSchema;
