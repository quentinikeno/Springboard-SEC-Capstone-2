/** Tests for the friends model */

const User = require("./user");
const Friends = require("./friends");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	requestFriends,
} = require("../tests/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** Test Friends model */

describe("test add method", () => {
	it("can add a friend request for two users to db", async () => {
		const { user1, user2, request } = await requestFriends();

		expect(request).toEqual(expect.any(Friends));
		expect(request).toEqual({
			id: expect.any(Number),
			user_1_id: user1.id,
			user_2_id: user2.id,
			accepted: false,
		});
	});

	it("will throw an error if users are already friends", async () => {
		await requestFriends();
		async () => {
			await expect(requestFriends()).toThrow();
		};
		async () => {
			await expect(requestFriends("user2", "user1")).toThrow();
		};
	});

	it("will throw an error if both users are the same", async () => {
		await requestFriends();
		async () => {
			await expect(requestFriends()).toThrow();
		};
		async () => {
			await expect(requestFriends("user1", "user1")).toThrow();
		};
	});
});

describe("test accept method", () => {
	it("can accept a user's friend request", async () => {
		const { user1, user2 } = await requestFriends();
		const acceptedFriends = await Friends.accept(user1.id, user2.id);

		expect(acceptedFriends).toEqual({
			id: expect.any(Number),
			user_1_id: user1.id,
			user_2_id: user2.id,
			accepted: true,
		});
	});
});

describe("test getFriends method", () => {
	it("can get all of a users pending friend users", async () => {
		const { user1, user2 } = await requestFriends();
		const friends = await Friends.getFriends(user1.id, false);

		expect(friends).toEqual([user2]);
	});

	it("can get all of a users accepted friend users", async () => {
		const { user1, user2, request } = await requestFriends();
		await request.accept();
		const friends = await Friends.getFriends(user1.id, true);

		expect(friends).toEqual([user2]);
	});
});
