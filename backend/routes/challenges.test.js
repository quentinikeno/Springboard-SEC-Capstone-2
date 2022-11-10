/** Tests for the challenges model */

const request = require("supertest");
const app = require("../app");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	addChallenge,
	addTestGame,
	requestFriendsAPI,
	getUserToken,
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
	it("returns all challenges for a user", async () => {
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
