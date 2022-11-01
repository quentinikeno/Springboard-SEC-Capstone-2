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

describe("test add games method", () => {
	it("adds a new game to the database", async () => {
		const game = await Games.add("test");
		expect(game).toEqual({ id: expect.any(Number), name: "test" });
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
