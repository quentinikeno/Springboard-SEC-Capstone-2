const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const createToken = require("./createToken");

describe("createToken", () => {
	it("creates a token given a non-admin user", () => {
		user = {
			id: 1,
			username: "test",
			joinAt: "11-11-2022",
			lastLoginAt: "11-11-2022",
			isAdmin: false,
		};
		const token = createToken(user);
		const verifiedToken = jwt.verify(token, SECRET_KEY);

		expect(verifiedToken).toEqual({
			iat: expect.any(Number),
			id: 1,
			username: "test",
			isAdmin: false,
		});
	});

	it("creates a token given an admin user", () => {
		user = {
			id: 1,
			username: "test",
			joinAt: "11-11-2022",
			lastLoginAt: "11-11-2022",
			isAdmin: true,
		};
		const token = createToken(user);
		const verifiedToken = jwt.verify(token, SECRET_KEY);

		expect(verifiedToken).toEqual({
			iat: expect.any(Number),
			id: 1,
			username: "test",
			isAdmin: true,
		});
	});
});
