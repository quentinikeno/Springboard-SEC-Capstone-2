/** Tests for the challenges model */

const Challenges = require("./challenges");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	addChallenge,
} = require("../tests/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("test getChallenges method", () => {
	it("can get all of a users challenges", async () => {
		const { request, testGame, challenge } = await addChallenge();
		const challenges = await Challenges.getChallenges(request.user_1_id);

		expect(challenges).toEqual([
			{
				id: expect.any(Number),
				friendsId: request.id,
				gameId: testGame.id,
				scoreToBeat: 1000,
				gameName: "testGame",
				friendUsername: "user2",
			},
		]);
	});
});

describe("test getChallenges method", () => {
	it("can get all of a users challenges", async () => {
		const { request, testGame, challenge } = await addChallenge();

		expect(challenge).toEqual({
			id: expect.any(Number),
			friendsId: request.id,
			gameId: testGame.id,
			scoreToBeat: 1000,
		});
	});
});
