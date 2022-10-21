/** Tests for user routes. */

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

/** Tests for /auth/register */

describe("Tests for POST /auth/register", () => {
	it("should register a new user", async () => {
		const resp = await request(app).post("/auth/register").send({
			username: "registerMe",
			email: "registerMe@email.com",
			password: "register",
		});

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			token: expect.any(String),
		});
	});
});
