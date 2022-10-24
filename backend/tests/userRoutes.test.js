/** Tests for the user routes */

const request = require("supertest");
const app = require("../app");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const GetU1Token = async () => {
	const res = await request(app).post("/auth/login").send({
		username: "user1",
		password: "password1",
	});
	return res.body.token;
};

/** Test User routes */

describe("test GET /user/[username]", () => {
	it("can get info on a certain user", async () => {
		const u1Token = await GetU1Token();
		const resp = await request(app)
			.get("/user/user1")
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.body).toEqual({
			id: expect.any(Number),
			username: "user1",
			lastLoginAt: expect.any(String),
			joinAt: expect.any(String),
		});
	});
});
