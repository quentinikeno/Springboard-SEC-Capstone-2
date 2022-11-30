/** Tests for the challenges model */

const request = require("supertest");
const app = require("../app");

const {
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	addTestGame,
	requestFriendsAPI,
} = require("../tests/_testCommon");

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

async function postChallenge() {
	const { u1Token, acceptedResp } = await requestFriendsAPI(true);
	const { testGame } = await addTestGame();
	const resp = await request(app)
		.post("/challenges")
		.set("authorization", `Bearer ${u1Token}`)
		.send({
			friendsId: acceptedResp.body.id,
			gameId: testGame.id,
			scoreToBeat: 100,
		});
	return { u1Token, acceptedResp, testGame, resp };
}

describe("GET /challenges", () => {
	it("returns all challenges for a user", async () => {
		const { u1Token, acceptedResp, testGame } = await postChallenge();
		const resp = await request(app)
			.get("/challenges")
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.body).toEqual([
			{
				id: expect.any(Number),
				friendsId: acceptedResp.body.id,
				gameId: testGame.id,
				scoreToBeat: 100,
				gameName: expect.any(String),
				friendUsername: "user2",
			},
		]);
	});

	it("throws a 401 status code if the user is not logged in", async () => {
		await postChallenge();
		const resp = await request(app).get("/challenges");

		expect(resp.status).toBe(401);
	});
});

describe("POST /challenges", () => {
	it("adds a challenge", async () => {
		const { acceptedResp, testGame, resp } = await postChallenge();

		expect(resp.status).toBe(201);
		expect(resp.body).toEqual({
			id: expect.any(Number),
			friendsId: acceptedResp.body.id,
			gameId: testGame.id,
			scoreToBeat: 100,
		});
	});

	it("throws a 400 error if no data is provided", async () => {
		const { u1Token } = await requestFriendsAPI(true);
		const resp = await request(app)
			.post("/challenges")
			.set("authorization", `Bearer ${u1Token}`)
			.send({});

		expect(resp.status).toBe(400);
	});

	it("throws a 400 error if data is bad", async () => {
		const { u1Token } = await requestFriendsAPI(true);
		const resp = await request(app)
			.post("/challenges")
			.set("authorization", `Bearer ${u1Token}`)
			.send({
				friendsId: "hello",
				gameId: "abc",
				scoreToBeat: "dkfj",
			});

		expect(resp.status).toBe(400);
	});
});

describe("PATCH /challenges", () => {
	it("updates a challenge", async () => {
		const {
			u1Token,
			acceptedResp,
			testGame,
			resp: challengeResp,
		} = await postChallenge();
		const resp = await request(app)
			.patch(`/challenges/${challengeResp.body.id}`)
			.set("authorization", `Bearer ${u1Token}`)
			.send({ scoreToBeat: 99 });

		expect(resp.body).toEqual({
			id: expect.any(Number),
			friendsId: acceptedResp.body.id,
			gameId: testGame.id,
			scoreToBeat: 99,
		});
	});

	it("throws an error if data is missing", async () => {
		const { u1Token, resp: challengeResp } = await postChallenge();
		const resp = await request(app)
			.patch(`/challenges/${challengeResp.body.id}`)
			.set("authorization", `Bearer ${u1Token}`)
			.send({});

		expect(resp.status).toBe(400);
	});

	it("throws an error if score is less than 1", async () => {
		const { u1Token, resp: challengeResp } = await postChallenge();
		const resp = await request(app)
			.patch(`/challenges/${challengeResp.body.id}`)
			.set("authorization", `Bearer ${u1Token}`)
			.send({ scoreToBeat: 0 });

		expect(resp.status).toBe(400);
	});
});

describe("DELETE /challenges", () => {
	it("deletes a challenge", async () => {
		const {
			u1Token,
			acceptedResp,
			testGame,
			resp: challengeResp,
		} = await postChallenge();
		const resp = await request(app)
			.delete(`/challenges/${challengeResp.body.id}`)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.body).toEqual({
			deleted: {
				id: expect.any(Number),
				friendsId: acceptedResp.body.id,
				gameId: testGame.id,
				scoreToBeat: 100,
			},
		});
	});

	it("gives 404 status code if not found", async () => {
		const { u1Token } = await postChallenge();
		const resp = await request(app)
			.delete(`/challenges/0`)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.status).toBe(404);
	});
});
