/** Tests for the Scores model */

const Scores = require("./scores");
const Games = require("./games");

const {
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	addTestGame,
} = require("../tests/_testCommon");

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("test getAll method", () => {
	it("can get all of a user's high score data", async () => {
		const { testGame, testUser } = await addTestGame();

		const scores = await Scores.getAll(testUser.id);

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

		const scores = await Scores.get(testUser.id, testGame.id);

		expect(scores).toEqual({
			id: expect.any(Number),
			userId: testUser.id,
			gameId: testGame.id,
			highScore: 100,
		});
	});

	it("will throw an error if nothing is found", async () => {
		const scores = await Scores.get(0, 0);

		expect(scores).toEqual({
			highScore: null,
		});
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

		const score = await Scores.update({
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
				Scores.update({
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
		const { testUser, testGame, score } = await addTestGame();

		const delScore = await Scores.delete(score.id);

		expect(delScore).toEqual({
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
			await expect(Scores.delete(0)).toThrow();
		};
	});
});

describe("test deletion on cascade", () => {
	it("can delete a user's high score data when a user is deleted", async () => {
		const { testUser } = await addTestGame();

		await testUser.delete();

		const scores = await Scores.getAll(testUser.id);
		expect(scores).toEqual([]);
	});

	it("can delete a user's high score data when a game is deleted", async () => {
		const { testGame, testUser } = await addTestGame();

		await Games.delete(testGame.id);

		const scores = await Scores.getAll(testUser.id);
		expect(scores).toEqual([]);
	});
});
