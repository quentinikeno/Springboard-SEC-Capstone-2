/** Tests for the friends model */

const Friends = require("./friends");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	getTestUser,
	requestFriends,
} = require("../tests/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** Test Friends model */

describe("test getFriends method", () => {
	it("can get all of a users pending friend users", async () => {
		const { user1, user2 } = await requestFriends();
		const friends = await Friends.getFriends(user1.id, false);

		expect(friends).toEqual([user2]);
	});

	it("can get all of a users accepted friend users", async () => {
		const { user1, user2 } = await requestFriends();
		await Friends.accept(user1.id, user2.id);
		const friends = await Friends.getFriends(user1.id, true);

		expect(friends).toEqual([user2]);
	});
});

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
		async () => {
			await expect(requestFriends("user1", "user1")).toThrow();
		};
	});

	it("will throw an error if the second user doesn't exist", async () => {
		const user1 = await getTestUser();

		async () => {
			await expect(Friends.add(user1.id, 99999999999)).toThrow();
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

	it("will throw an error if users don't have a pending friend request", async () => {
		async () => {
			await Friends.accept("user1", "user2");
		};
	});
});

describe("test delete method", () => {
	it("can delete two users' friend request", async () => {
		const { user1, user2 } = await requestFriends();
		const deletedFriends = await Friends.delete(user1.id, user2.id);

		expect(deletedFriends).toEqual({
			deletedFriends: {
				user_1_id: user1.id,
				user_2_id: user2.id,
			},
		});
	});

	it("will throw an error if users don't have a pending friend request or aren't already friends.", async () => {
		async () => {
			await Friends.delete("user1", "user2");
		};
	});
});
