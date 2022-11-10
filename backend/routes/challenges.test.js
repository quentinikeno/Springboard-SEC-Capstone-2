/** Tests for the challenges model */

const request = require("supertest");
const app = require("../app");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	addTestGame,
	requestFriendsAPI,
} = require("../tests/_testCommon");

beforeAll(commonBeforeAll);
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
});
