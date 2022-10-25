/** Tests for the friends model */

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

/** Test Friends model */

describe("test add method", () => {
	it("can add a friend request for two users to db", async () => {
		const friends = await Friends.add(user1.id, user2.id);

		expect(friends).toEqual(expect.any(Friends));
	});
});
