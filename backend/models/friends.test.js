/** Tests for the friends model */

const User = require("./user");
const Friends = require("./friends");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	user1,
	user2,
} = require("../tests/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const getTestUser = async (user = "user1") => {
	return await User.get(user);
};

const requestFriends = async (username1 = "user1", username2 = "user2") => {
	const user1 = await getTestUser(username1);
	const user2 = await getTestUser(username2);
	const friends = await Friends.add(user1.id, user2.id);
	return { user1, user2, friends };
};
/** Test Friends model */

describe("test add method", () => {
	it("can add a friend request for two users to db", async () => {
		const { user1, user2, friends } = await requestFriends();

		expect(friends).toEqual(expect.any(Friends));
		expect(friends).toEqual({
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
});
