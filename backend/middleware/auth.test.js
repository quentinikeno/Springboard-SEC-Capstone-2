"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError401, ForbiddenError403 } = require("../expressError");
const {
	authenticateJWT,
	ensureLoggedIn,
	ensurePermittedUser,
	ensureAdmin,
} = require("./auth");

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

describe("ensureLoggedIn", () => {
	it("works", () => {
		expect.assertions(1);
		const req = {};
		const res = {
			locals: { user: { id: 1, username: "test", isAdmin: false } },
		};
		const next = (error) => {
			expect(error).toBeFalsy();
		};
		ensureLoggedIn(req, res, next);
	});

	it("unauthorized if not logged in", () => {
		expect.assertions(1);
		const req = {};
		const res = {
			locals: {},
		};
		const next = (error) => {
			expect(error instanceof UnauthorizedError401).toBeTruthy();
		};
		ensureLoggedIn(req, res, next);
	});
});

describe("ensurePermittedUser", () => {
	it("works", () => {
		expect.assertions(1);
		const req = { params: { username: "test" } };
		const res = {
			locals: { user: { id: 1, username: "test", isAdmin: false } },
		};
		const next = (error) => {
			expect(error).toBeFalsy();
		};
		ensurePermittedUser(req, res, next);
	});

	it("forbidden if different user", () => {
		expect.assertions(1);
		const req = { params: { username: "differentUser" } };
		const res = {
			locals: { user: { id: 1, username: "test", isAdmin: false } },
		};
		const next = (error) => {
			expect(error instanceof ForbiddenError403).toBeTruthy();
		};
		ensurePermittedUser(req, res, next);
	});
});

describe("ensureAdmin", () => {
	it("works", () => {
		expect.assertions(1);
		const req = {};
		const res = {
			locals: { user: { id: 1, username: "test", isAdmin: true } },
		};
		const next = (error) => {
			expect(error).toBeFalsy();
		};
		ensureAdmin(req, res, next);
	});

	it("is forbidden if user is not admin", () => {
		expect.assertions(1);
		const req = {};
		const res = {
			locals: { user: { id: 1, username: "test", isAdmin: false } },
		};
		const next = (error) => {
			expect(error instanceof ForbiddenError403).toBeTruthy();
		};
		ensureAdmin(req, res, next);
	});
});
