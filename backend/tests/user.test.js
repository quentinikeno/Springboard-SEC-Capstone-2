/** Tests for the user model */

const db = require("../db");
const User = require("../models/user");

describe("Test User class", function () {
	beforeEach(async function () {
		await db.query("DELETE FROM users");
		const testUser = await User.register({
			username: "test",
			password: "password",
			email: "test@example.com",
		});
	});

	it("can register a new user", async () => {
		const u = await User.register({
			username: "ken",
			password: "password123",
			email: "test@test.com",
		});

		expect(u.username).toBe("ken");
	});
});

afterAll(async function () {
	await db.end();
});
