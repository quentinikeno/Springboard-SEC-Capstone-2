/** Tests for the user model */

const db = require("../db");
const User = require("../models/user");
const expressError = require("../expressError");

const loginTestUser = async () => {
	return await User.authenticate("test", "password");
};

describe("Test User class", function () {
	beforeEach(async function () {
		await db.query("DELETE FROM users");
		let testUser = await User.register({
			username: "test",
			password: "password",
			email: "test@example.com",
		});
	});

	describe("test register method", () => {
		it("can register a new user", async () => {
			const u = await User.register({
				username: "ken",
				password: "password123",
				email: "test@test.com",
			});

			expect(u).toEqual(expect.any(User));
			expect(u.username).toBe("ken");
		});
	});

	describe("test get all method", () => {
		it("can get all users", async () => {
			const all = await User.getAllUsers();
			const [user] = all;
			expect(all).toEqual([expect.any(User)]);
			expect(user.id).toEqual(expect.any(Number));
			expect(user.username).toBe("test");
			expect(user.lastLoginAt).toEqual(expect.any(Date));
			expect(user.joinAt).toEqual(expect.any(Date));
		});
	});

	describe("test the authenticate method", () => {
		it("can authenticate a user", async () => {
			const user = await User.authenticate("test", "password");

			expect(user).toEqual(expect.any(User));
			expect(user.id).toEqual(expect.any(Number));
			expect(user.username).toBe("test");
			expect(user.lastLoginAt).toEqual(expect.any(Date));
			expect(user.joinAt).toEqual(expect.any(Date));
		});

		it("will throw an error with wrong password", async () => {
			async () => {
				await expect(
					User.authenticate("test", "WRONGpassword")
				).toThrow();
			};
		});

		it("will throw an error if no username or no passowrd", async () => {
			async () => {
				await expect(User.authenticate("test")).toThrow();
			};
			async () => {
				await expect(User.authenticate()).toThrow();
			};
		});
	});

	describe("test get method", () => {
		it("should return a user given a username", async () => {
			const user = await User.get("test");

			expect(user).toEqual(expect.any(User));
			expect(user.id).toEqual(expect.any(Number));
			expect(user.username).toBe("test");
			expect(user.lastLoginAt).toEqual(expect.any(Date));
			expect(user.joinAt).toEqual(expect.any(Date));
		});

		it("should throw an error if the user is not found", async () => {
			async () => {
				await expect(User.get("notThere")).toThrow();
			};
		});
	});

	describe("test update method", () => {
		it("should update email, password, and username", async () => {
			const user = await loginTestUser();
			const updatedUser = await user.update({
				email: "wow@mail.com",
				password: "superSecret",
				username: "betterUsername",
			});
			expect(updatedUser).toEqual(expect.any(User));
			expect(updatedUser.id).toEqual(user.id);
			expect(updatedUser.username).toBe("betterUsername");
		});
	});

	describe("test delete method", () => {
		it("should delete a user", async () => {
			const user = await loginTestUser();
			const updatedUser = await user.delete();

			expect(updatedUser).toEqual(undefined);

			async () => {
				await expect(User.get("test")).toThrow();
			};
		});
	});
});

afterAll(async function () {
	await db.end();
});
