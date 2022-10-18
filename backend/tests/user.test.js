/** Tests for the user model */

const db = require("../db");
const User = require("../models/user");

describe("Test User class", function () {
	beforeEach(async function () {
		await db.query("DELETE FROM users");
		let testUser = await User.register({
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

	it("can get all users", async () => {
		const all = await User.getAllUsers();
		expect(all).toEqual([
			{
				id: expect.any(Number),
				username: "test",
				lastLoginAt: expect.any(Date),
				joinAt: expect.any(Date),
			},
		]);
	});
});

afterAll(async function () {
	await db.end();
});
