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

const requestFriends = async (accept = false) => {
	const u1Token = await getUserToken();
	const { body: user2 } = await request(app)
		.get("/user/user2")
		.set("authorization", `Bearer ${u1Token}`);
	const resp = await request(app)
		.post(`/friends/${user2.id}`)
		.set("authorization", `Bearer ${u1Token}`);
	let acceptedResp;
	if (accept) {
		acceptedResp = await request(app)
			.patch(`/friends/${user2.id}`)
			.set("authorization", `Bearer ${u1Token}`);
	}
	return { u1Token, user2, resp, acceptedResp };
};

/** Test Friends routes */

describe("test GET /friends/[pendingOrAccepted]", () => {
	it("returns empty arrays for users with no friends", async () => {
		const u1Token = await getUserToken();
		const pending = await request(app)
			.get("/friends/pending")
			.set("authorization", `Bearer ${u1Token}`);
		const accepted = await request(app)
			.get("/friends/accepted")
			.set("authorization", `Bearer ${u1Token}`);
		expect(pending.body).toEqual([]);
		expect(accepted.body).toEqual([]);
	});

	it("returns a user's pending friends", async () => {
		const { u1Token, user2 } = await requestFriends();
		const friends = await request(app)
			.get("/friends/pending")
			.set("authorization", `Bearer ${u1Token}`);
		expect(friends.body).toEqual([user2]);
	});

	it("throws an error if the route parameter is not 'pending' or 'accepted'", async () => {
		const u1Token = await getUserToken();
		const resp = await request(app)
			.get("/friends/wrong")
			.set("authorization", `Bearer ${u1Token}`);
		expect(resp.statusCode).toBe(400);
	});

	it("throws an error if the user is not logged in", async () => {
		const friends = await request(app).get("/friends/pending");
		expect(friends.statusCode).toBe(401);
	});
});

describe("test POST /friends/[userId]", () => {
	it("create a friend request for two users", async () => {
		const { u1Token, user2, resp } = await requestFriends();

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

	it("throws an error if the user is not logged in", async () => {
		const u1Token = await getUserToken();
		const { body: user2 } = await request(app)
			.get("/user/user2")
			.set("authorization", `Bearer ${u1Token}`);
		const resp = await request(app).post(`/friends/${user2.id}`);
		expect(resp.statusCode).toBe(401);
	});
});

describe("test PATCH /friends/[userId]", () => {
	it("accepts a friend request for two users", async () => {
		const { u1Token, user2, acceptedResp } = await requestFriends(true);

		expect(acceptedResp.statusCode).toBe(201);
		expect(acceptedResp.body).toEqual({
			id: expect.any(Number),
			user_1_id: expect.any(Number),
			user_2_id: user2.id,
			accepted: true,
		});

		const friends = await request(app)
			.get("/friends/accepted")
			.set("authorization", `Bearer ${u1Token}`);
		expect(friends.body).toEqual([user2]);
	});

	it("throws an error if the two users do not have a pending friend request", async () => {
		const u1Token = await getUserToken();
		const { body: user2 } = await request(app)
			.get("/user/user2")
			.set("authorization", `Bearer ${u1Token}`);

		const acceptedResp = await request(app)
			.patch(`/friends/${user2.id}`)
			.set("authorization", `Bearer ${u1Token}`);
		expect(acceptedResp.statusCode).toBe(400);
	});

	it("throws an error if the user is not logged in", async () => {
		const u1Token = await getUserToken();
		const { body: user2 } = await request(app)
			.get("/user/user2")
			.set("authorization", `Bearer ${u1Token}`);

		const acceptedResp = await request(app).patch(`/friends/${user2.id}`);
		expect(acceptedResp.statusCode).toBe(401);
	});
});
