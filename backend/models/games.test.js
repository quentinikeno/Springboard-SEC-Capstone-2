/** Tests for the games model */

const Games = require("./games");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	addTestGame,
} = require("../tests/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** Test Games model */

describe("test getAll games method", () => {
	it("gets all Games", async () => {
		const games = await Games.getAll();
		expect(games).toEqual([{ id: expect.any(Number), name: "testGame" }]);
	});
});

describe("test get games method", () => {
	it("gets a game with the game's id", async () => {
		const [testGame] = await Games.getAll();
		const game = await Games.get(testGame.id);
		expect(game).toEqual({ id: testGame.id, name: "testGame" });
	});

	it("throws an error if the game name does not exist", async () => {
		async () => {
			await expect(Games.add(99999999)).toThrow();
		};
	});
});

describe("test add games method", () => {
	it("adds a new game to the database", async () => {
		const game = await Games.add("test");
		expect(game).toEqual({ id: expect.any(Number), name: "test" });

		const testGame = await Games.get(game.id);
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

describe("test update games method", () => {
	it("updates a game's name", async () => {
		const [testGame] = await Games.getAll();
		const game = await Games.update(testGame.id, "updatedName");
		expect(game).toEqual({ id: expect.any(Number), name: "updatedName" });
	});

	it("throws an error if the game name does not exist", async () => {
		async () => {
			await expect(Games.update(999999, "updatedName")).toThrow();
		};
	});
});

describe("test delete games method", () => {
	it("deletes a game by name", async () => {
		const [testGame] = await Games.getAll();
		const game = await Games.delete(testGame.id);
		expect(game).toEqual({
			deleted: { id: testGame.id, name: "testGame" },
		});
	});

	it("throws an error if the game name does not exist", async () => {
		async () => {
			await expect(Games.delete(99999999)).toThrow();
		};
	});
});

describe("getTop10Scores method ", () => {
	it("returns the top 10 scores and user", async () => {
		const { testGame, testUser, score } = await addTestGame();
		const users = await Games.getTop10Scores(testGame.id);

		expect(users).toEqual([
			{ username: testUser.username, highScore: score.highScore },
		]);
	});
});
