/** Tests for the userGames model */

const UserGames = require("./userGames");
const Games = require("./games");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	getTestUser,
} = require("../tests/_testCommon");
const { expectCt } = require("helmet");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const addTestGame = async () => {
	const [testGame] = await Games.getAll();
	const testUser = await getTestUser();
	const score = await UserGames.add({
		userId: testUser.id,
		gameId: testGame.id,
		highScore: 100,
	});
	return { testGame, testUser, score };
};

describe("test getAll method", () => {
	it("can get all of a user's high score data", async () => {
		const { testGame, testUser } = await addTestGame();

		const scores = await UserGames.getAll(testUser.id);

		expect(scores).toEqual([
			{
				id: expect.any(Number),
				userId: testUser.id,
				gameId: testGame.id,
				highScore: 100,
				gameName: "testGame",
			},
		]);
	});
});

describe("test get method", () => {
	it("can get a user's high score data for a specific game", async () => {
		const { testGame, testUser } = await addTestGame();

		const scores = await UserGames.get(testUser.id, testGame.id);

		expect(scores).toEqual({
			id: expect.any(Number),
			userId: testUser.id,
			gameId: testGame.id,
			highScore: 100,
		});
	});

	it("will throw an error if nothing is found", async () => {
		async () => {
			await expect(UserGames.get(0, 0)).toThrow();
		};
	});
});

describe("test add method", () => {
	it("can add user's high score data", async () => {
		const { testGame, testUser, score } = await addTestGame();

		expect(score).toEqual({
			id: expect.any(Number),
			userId: testUser.id,
			gameId: testGame.id,
			highScore: 100,
		});
	});
});

describe("test update method", () => {
	it("can update a user's high score data for a specific game", async () => {
		const { testGame, testUser } = await addTestGame();

		const score = await UserGames.update({
			userId: testUser.id,
			gameId: testGame.id,
			highScore: 200,
		});

		expect(score).toEqual({
			id: expect.any(Number),
			userId: testUser.id,
			gameId: testGame.id,
			highScore: 200,
		});
	});

	it("will throw an error if nothing is found", async () => {
		async () => {
			await expect(
				UserGames.update({
					userId: testUser.id,
					gameId: testGame.id,
					highScore: 200,
				})
			).toThrow();
		};
	});
});

describe("test delete method", () => {
	it("can delete a user's high score data for a specific game", async () => {
		const { testGame, testUser } = await addTestGame();

		const score = await UserGames.delete(testUser.id, testGame.id);

		expect(score).toEqual({
			deleted: {
				id: expect.any(Number),
				userId: testUser.id,
				gameId: testGame.id,
				highScore: 100,
			},
		});
	});

	it("will throw an error if nothing is found", async () => {
		async () => {
			await expect(UserGames.delete(0, 0)).toThrow();
		};
	});
});
