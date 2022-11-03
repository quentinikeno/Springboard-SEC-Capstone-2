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
	const score = await UserGames.add(testUser.id, testGame.id, 100);
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
