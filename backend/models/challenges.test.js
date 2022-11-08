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
		const { request, testGame } = await addChallenge();
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

describe("test add method", () => {
	it("adds a new challenge", async () => {
		const { request, testGame, challenge } = await addChallenge();

		expect(challenge).toEqual({
			id: expect.any(Number),
			friendsId: request.id,
			gameId: testGame.id,
			scoreToBeat: 1000,
		});
	});
});

describe("test update method", () => {
	it("updates a challenge", async () => {
		const { request, testGame, challenge } = await addChallenge();
		const updated = await Challenges.update(challenge.id, 99);
		const expectedResult = {
			id: challenge.id,
			friendsId: request.id,
			gameId: testGame.id,
			scoreToBeat: 99,
		};

		expect(updated).toEqual(expectedResult);

		const challenges = await Challenges.getChallenges(request.user_1_id);
		expect(challenges).toEqual([
			{
				...expectedResult,
				gameName: "testGame",
				friendUsername: "user2",
			},
		]);
	});
});

describe("test delete method", () => {
	it("deletes a challenge", async () => {
		const { request, testGame, challenge } = await addChallenge();
		const updated = await Challenges.delete(challenge.id);

		expect(updated).toEqual({
			deletedChallenge: {
				id: challenge.id,
				friendsId: request.id,
				gameId: testGame.id,
				scoreToBeat: 1000,
			},
		});

		const challenges = await Challenges.getChallenges(request.user_1_id);
		expect(challenges).toEqual([]);
	});
});
