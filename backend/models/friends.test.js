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
			user1Id: user1.id,
			user2Id: user2.id,
		});
	});

	it("will throw an error if users don't have a pending friend request or aren't already friends.", async () => {
		async () => {
			await Friends.delete("user1", "user2");
		};
	});
});
