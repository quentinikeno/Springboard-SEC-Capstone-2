/** Tests for the scores routes */

const { expectCt } = require("helmet");
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

const addScore = async () => {
	const adminToken = await getUserToken("admin", "admin");
	const u1Token = await getUserToken();
	const gamesResp = await request(app)
		.get("/games")
		.set("authorization", `Bearer ${adminToken}`);
	const testGameId = gamesResp.body.games[0].id;
	const resp = await request(app)
		.post("/scores")
		.set("authorization", `Bearer ${u1Token}`)
		.send({ gameId: testGameId, highScore: 1000 });
	return { u1Token, testGameId, score: resp.body, status: resp.status };
};

describe("test POST /scores", () => {
	it("adds a new highscore for a user and game", async () => {
		const { testGameId, score, status } = await addScore();
		expect(status).toBe(201);
		expect(score).toEqual({
			id: expect.any(Number),
			userId: expect.any(Number),
			gameId: testGameId,
			highScore: 1000,
		});
	});
});
