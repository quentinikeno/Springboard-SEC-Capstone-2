/** Tests for the games model */

const Games = require("./games");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
} = require("../tests/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** Test Games model */

describe("test get games method", () => {
	it("gets a game with the game's name", async () => {
		const game = await Games.get("testGame");
		expect(game).toEqual({ id: expect.any(Number), name: "testGame" });
	});

	it("throws an error if the game name does not exist", async () => {
		async () => {
			await expect(Games.add("nonexistant")).toThrow();
		};
	});
});

describe("test add games method", () => {
	it("adds a new game to the database", async () => {
		const game = await Games.add("test");
		expect(game).toEqual({ id: expect.any(Number), name: "test" });

		const testGame = await Games.get("test");
		expect(testGame).toEqual(game);
	});

	it("throws an error if the game name is not unique", async () => {
		async () => {
			await expect(Games.add("testGame")).toThrow();
		};
	});

	it("throws an error if the game name is not provided", async () => {
		async () => {
			await expect(Games.add()).toThrow();
		};
	});
});
