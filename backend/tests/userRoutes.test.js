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

/** Tests for /auth/login */

describe("Tests for POST /auth/login", () => {
	it("authenticates a user", async () => {
		const resp = await request(app).post("/auth/login").send({
			username: "user1",
			password: "password1",
		});
		expect(resp.body).toEqual({
			token: expect.any(String),
		});
	});

	it("throws an error if the user is not found", async () => {
		const resp = await request(app).post("/auth/login").send({
			username: "notFound",
			password: "password1",
		});
		expect(resp.statusCode).toEqual(404);
	});

	it("throws an error if the password is incorrect", async () => {
		const resp = await request(app).post("/auth/login").send({
			username: "user1",
			password: "wrongPassword",
		});
		expect(resp.statusCode).toEqual(400);
	});

	it("throws an error for bad request with missing data", async () => {
		const resp = await request(app).post("/auth/login").send({
			username: "user1",
		});
		expect(resp.statusCode).toEqual(400);
	});

	it("throws an error for bad request with invalid number usernames", async () => {
		const resp = await request(app).post("/auth/login").send({
			username: 123,
			password: "password1",
		});
		expect(resp.statusCode).toEqual(400);
	});
});
