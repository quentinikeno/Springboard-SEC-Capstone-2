/** Tests for the user model */

const User = require("./user");
const Friends = require("./friends");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
} = require("../tests/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const loginTestUser = async () => {
	return await User.authenticate("user1", "password1");
};

const getTestUser = async (user = "user1") => {
	return await User.get(user);
};

const requestFriends = async (username1 = "user1", username2 = "user2") => {
	const user1 = await getTestUser(username1);
	const user2 = await getTestUser(username2);
	const request = await Friends.add(user1.id, user2.id);
	return { user1, user2, request };
};

/** Test User model */

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

		expect(all.every((user) => user instanceof User)).toBeTruthy();
	});
});

describe("test the authenticate method", () => {
	it("can authenticate a user", async () => {
		const user = await User.authenticate("user1", "password1");

		expect(user).toEqual(expect.any(User));
		expect(user.id).toEqual(expect.any(Number));
		expect(user.username).toBe("user1");
		expect(user.lastLoginAt).toEqual(expect.any(Date));
		expect(user.joinAt).toEqual(expect.any(Date));
	});

	it("will throw an error with wrong password", async () => {
		async () => {
			await expect(User.authenticate("user1", "WRONGpassword")).toThrow();
		};
	});

	it("will throw an error if no username or no passowrd", async () => {
		async () => {
			await expect(User.authenticate("user1")).toThrow();
		};
		async () => {
			await expect(User.authenticate()).toThrow();
		};
	});
});

describe("test get method", () => {
	it("should return a user given a username", async () => {
		const user = await User.get("user1");

		expect(user).toEqual(expect.any(User));
		expect(user.id).toEqual(expect.any(Number));
		expect(user.username).toBe("user1");
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
			newPassword: "superSecret",
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

		expect(updatedUser).toEqual({ username: "user1" });

		async () => {
			await expect(User.get("user1")).toThrow();
		};
	});
});

describe("test getFriends method", () => {
	it("can get all of a users pending friend users", async () => {
		const { user1, user2 } = await requestFriends();
		const friends = await user1.getFriends(false);

		expect(friends).toEqual([user2]);
	});

	it("can get all of a users accepted friend users", async () => {
		const { user1, user2, request } = await requestFriends();
		await request.accept();
		const friends = await user1.getFriends(true);

		expect(friends).toEqual([user2]);
	});
});
