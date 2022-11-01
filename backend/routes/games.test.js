/** Tests for the games routes */

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

describe("test /games", () => {
	it("gets all games", async () => {
		const adminToken = await getUserToken("admin", "admin");
		const resp = await request(app)
			.get("/games")
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.body).toEqual({
			games: [{ id: expect.any(Number), name: "testGame" }],
		});
	});
});

describe("test /games/[id]", () => {
	it("gets a game with an ID", async () => {
		const adminToken = await getUserToken("admin", "admin");
		const gamesResp = await request(app)
			.get("/games")
			.set("authorization", `Bearer ${adminToken}`);
		const testGameId = gamesResp.body.games[0].id;
		const resp = await request(app)
			.get(`/games/${testGameId}`)
			.set("authorization", `Bearer ${adminToken}`);
		expect(resp.body).toEqual({ id: expect.any(Number), name: "testGame" });
	});

	it("throws an error if the game does not exist", async () => {
		const adminToken = await getUserToken("admin", "admin");
		const resp = await request(app)
			.get("/games/99999999")
			.set("authorization", `Bearer ${adminToken}`);
		expect(resp.statusCode).toEqual(404);
	});
});
