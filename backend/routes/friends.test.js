/** Tests for the friends routes */

const request = require("supertest");
const app = require("../app");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	getUserToken,
} = require("../tests/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** Test Friends routes */

describe("test POST /friends/[userId]", () => {
	it("create a friend request for two users", async () => {
		const u1Token = await getUserToken();
		const { body: user2 } = await request(app)
			.get("/user/user2")
			.set("authorization", `Bearer ${u1Token}`);
		const resp = await request(app)
			.post(`/friends/${user2.id}`)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toBe(201);
		expect(resp.body).toEqual({
			id: expect.any(Number),
			user_1_id: expect.any(Number),
			user_2_id: user2.id,
			accepted: false,
		});

		const friends = await request(app)
			.get("/friends/pending")
			.set("authorization", `Bearer ${u1Token}`);
		expect(friends.body).toEqual([user2]);
	});
});
