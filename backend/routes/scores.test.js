/** Tests for the scores routes */

const request = require("supertest");
const app = require("../app");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	getUserToken,
	addScore,
} = require("../tests/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

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

		// throws an error if POST again
		const { status: status2 } = await addScore();
		expect(status2).toBe(400);
	});

	it("gives 401 status code if the user is not logged in", async () => {
		const adminToken = await getUserToken("admin", "admin");
		const gamesResp = await request(app)
			.get("/games")
			.set("authorization", `Bearer ${adminToken}`);
		const testGameId = gamesResp.body.games[0].id;
		const resp = await request(app)
			.post("/scores")
			.send({ gameId: testGameId, highScore: 1000 });

		expect(resp.status).toBe(401);
	});
});

describe("test PATCH /scores", () => {
	it("updates a highscore for a user and game", async () => {
		const { u1Token, testGameId } = await addScore();
		const resp = await request(app)
			.patch("/scores")
			.set("authorization", `Bearer ${u1Token}`)
			.send({ gameId: testGameId, highScore: 2000 });

		expect(resp.body).toEqual({
			id: expect.any(Number),
			userId: expect.any(Number),
			gameId: testGameId,
			highScore: 2000,
		});
	});

	it("returns a 400 status code if the gameId or high score are missing", async () => {
		const { u1Token } = await addScore();
		const resp = await request(app)
			.patch("/scores")
			.set("authorization", `Bearer ${u1Token}`)
			.send({});

		expect(resp.status).toBe(400);
	});

	it("returns a 400 status code if the high score is a string", async () => {
		const { u1Token, testGameId } = await addScore();
		const resp = await request(app)
			.patch("/scores")
			.set("authorization", `Bearer ${u1Token}`)
			.send({ gameId: testGameId, highScore: "score" });

		expect(resp.status).toBe(400);
	});
});

describe("test DELETE /scores/[id]", () => {
	it("deletes a highscore for a user and game", async () => {
		const { u1Token, testGameId, score } = await addScore();
		const resp = await request(app)
			.delete(`/scores/${score.id}`)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.body).toEqual({
			deleted: {
				id: expect.any(Number),
				userId: expect.any(Number),
				gameId: testGameId,
				highScore: 1000,
			},
		});
	});
});
