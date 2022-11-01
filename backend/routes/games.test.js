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

describe("test GET /games", () => {
	it("gets all games", async () => {
		const adminToken = await getUserToken("admin", "admin");
		const resp = await request(app)
			.get("/games")
			.set("authorization", `Bearer ${adminToken}`);

		expect(resp.body).toEqual({
			games: [{ id: expect.any(Number), name: "testGame" }],
		});
	});

	it("is forbidden if user is not admin", async () => {
		const u1Token = await getUserToken();
		const resp = await request(app)
			.get("/games")
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(403);
	});
});

describe("test GET /games/[id]", () => {
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

	it("is forbidden if user is not admin", async () => {
		const u1Token = await getUserToken();
		const adminToken = await getUserToken("admin", "admin");
		const gamesResp = await request(app)
			.get("/games")
			.set("authorization", `Bearer ${adminToken}`);
		const testGameId = gamesResp.body.games[0].id;
		const resp = await request(app)
			.get(`/games/${testGameId}`)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(403);
	});
});

describe("test POST /games", () => {
	it("adds a new game", async () => {
		const adminToken = await getUserToken("admin", "admin");
		const resp = await request(app)
			.post("/games")
			.set("authorization", `Bearer ${adminToken}`)
			.send({ name: "newGame" });

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({ id: expect.any(Number), name: "newGame" });
	});

	it("throws an error if the game name is not unique", async () => {
		const adminToken = await getUserToken("admin", "admin");
		const resp = await request(app)
			.post("/games")
			.set("authorization", `Bearer ${adminToken}`)
			.send({ name: "testGame" });

		expect(resp.statusCode).toEqual(500);
	});

	it("is forbidden if user is not admin", async () => {
		const u1Token = await getUserToken();
		const resp = await request(app)
			.post("/games")
			.set("authorization", `Bearer ${u1Token}`)
			.send({ name: "newGame" });

		expect(resp.statusCode).toEqual(403);
	});
});
