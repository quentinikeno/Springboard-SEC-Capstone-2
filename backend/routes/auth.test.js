/** Tests for auth routes. */

const request = require("supertest");
const app = require("../app");

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

/** Tests for /auth/register */

describe("Tests for POST /auth/register", () => {
	it("should register a new user", async () => {
		const resp = await request(app).post("/auth/register").send({
			username: "reggieStir",
			email: "registerMe@email.com",
			password: "register",
		});

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			token: expect.any(String),
			user: {
				username: "reggieStir",
				id: expect.any(Number),
				lastLoginAt: expect.any(String),
				joinAt: expect.any(String),
				isAdmin: false,
			},
		});
	});

	it("should throw an error for bad request with missing data", async () => {
		const resp = await request(app).post("/auth/register").send({
			email: "registerMe@email.com",
		});

		expect(resp.statusCode).toEqual(400);
	});

	it("should throw an error for bad request with invalid data", async () => {
		const resp = await request(app).post("/auth/register").send({
			username: 2,
			email: "bogus.email",
			password: 99,
		});

		expect(resp.statusCode).toEqual(400);
	});

	it("should have a 409 status code if the username is already taken", async () => {
		const resp = await request(app).post("/auth/register").send({
			username: "user1",
			email: "test@mail.com",
			password: "helloWorld1234",
		});

		expect(resp.statusCode).toEqual(409);
	});
	it("should have a 409 status code if the email is already taken", async () => {
		const resp = await request(app).post("/auth/register").send({
			username: "reggieStir",
			email: "user1@test.com",
			password: "helloWorld1234",
		});

		expect(resp.statusCode).toEqual(409);
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
			user: {
				username: "user1",
				id: expect.any(Number),
				lastLoginAt: expect.any(String),
				joinAt: expect.any(String),
				isAdmin: false,
			},
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
