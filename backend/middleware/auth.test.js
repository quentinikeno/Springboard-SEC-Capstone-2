"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError401 } = require("../expressError");
const { authenticateJWT, ensureLoggedIn } = require("./auth");

const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign(
	{ id: 1, username: "test", isAdmin: false },
	SECRET_KEY
);
const badJwt = jwt.sign({ id: 1, username: "test", isAdmin: false }, "bad_key");

describe("authenticate JWT", () => {
	it("works with the header", () => {
		expect.assertions(2);
		const req = { headers: { authorization: `Bearer ${testJwt}` } };
		const res = { locals: {} };
		const next = (error) => {
			expect(error).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({
			user: {
				id: 1,
				username: "test",
				isAdmin: false,
				iat: expect.any(Number),
			},
		});
	});

	it("works with no header", () => {
		expect.assertions(2);
		const req = {};
		const res = { locals: {} };
		const next = (error) => {
			expect(error).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({});
	});

	it("works with invalid tokens", () => {
		expect.assertions(2);
		const req = { headers: { authorization: `Bearer ${badJwt}` } };
		const res = { locals: {} };
		const next = (error) => {
			expect(error).toBeTruthy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({});
	});
});
