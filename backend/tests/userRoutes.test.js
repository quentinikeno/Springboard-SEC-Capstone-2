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

const GetUserToken = async (username = "user1", password = "password1") => {
	const res = await request(app).post("/auth/login").send({
		username,
		password,
	});
	return res.body.token;
};

/** Test User routes */

describe("test GET /user/[username]", () => {
	it("can get info on a certain user", async () => {
		const u1Token = await GetUserToken();
		const resp = await request(app)
			.get("/user/user1")
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({
			id: expect.any(Number),
			username: "user1",
			lastLoginAt: expect.any(String),
			joinAt: expect.any(String),
		});
	});

	it("thows a 404 status code if the user doesn't exist", async () => {
		const u1Token = await GetUserToken();
		const resp = await request(app)
			.get("/user/nonexistant")
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toBe(404);
	});
});

describe("test PATCH /user/[username]", () => {
	it("can update info on a certain user", async () => {
		const u1Token = await GetUserToken();
		const resp = await request(app)
			.patch("/user/user1")
			.set("authorization", `Bearer ${u1Token}`)
			.send({
				email: "wow@mail.com",
				newPassword: "superSecret",
				oldPassword: "password1",
				username: "betterUsername",
			});

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({
			id: expect.any(Number),
			username: "betterUsername",
			lastLoginAt: expect.any(String),
			joinAt: expect.any(String),
		});

		// check that we can access the get route with the new username
		const updatedU1Token = await GetUserToken(
			"betterUsername",
			"superSecret"
		);
		const resp2 = await request(app)
			.get("/user/betterUsername")
			.set("authorization", `Bearer ${updatedU1Token}`);

		expect(resp2.body).toEqual({
			id: expect.any(Number),
			username: "betterUsername",
			lastLoginAt: expect.any(String),
			joinAt: expect.any(String),
		});
	});

	it("can update part of a user's data", async () => {
		const u1Token = await GetUserToken();
		const resp = await request(app)
			.patch("/user/user1")
			.set("authorization", `Bearer ${u1Token}`)
			.send({
				email: "wow@mail.com",
				oldPassword: "password1",
			});

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({
			id: expect.any(Number),
			username: "user1",
			lastLoginAt: expect.any(String),
			joinAt: expect.any(String),
		});
	});

	it("throws an error if the password is wrong or not included", async () => {
		const u1Token = await GetUserToken();
		const resp = await request(app)
			.patch("/user/user1")
			.set("authorization", `Bearer ${u1Token}`)
			.send({
				email: "wow@mail.com",
				newPassword: "superSecret",
				oldPassword: "wrongPassword",
				username: "betterUsername",
			});
		const resp2 = await request(app)
			.patch("/user/user1")
			.set("authorization", `Bearer ${u1Token}`)
			.send({
				email: "wow@mail.com",
				newPassword: "superSecret",
				username: "betterUsername",
			});

		expect(resp.statusCode).toEqual(400);
		expect(resp2.statusCode).toEqual(400);
	});

	it("throws an error when updating another user's info", async () => {
		const u1Token = await GetUserToken();
		const resp = await request(app)
			.patch("/user/user2")
			.set("authorization", `Bearer ${u1Token}`)
			.send({
				email: "wow@mail.com",
				newPassword: "superSecret",
				oldPassword: "password1",
				username: "betterUsername",
			});

		expect(resp.statusCode).toBe(403);
	});
});

describe("test DELETE /user/[username]", () => {
	it("can delete a certain user", async () => {
		const u1Token = await GetUserToken();
		const resp = await request(app)
			.delete("/user/user1")
			.set("authorization", `Bearer ${u1Token}`)
			.send({
				password: "password1",
			});

		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({
			deleted: "user1",
		});

		// check that the user no longer exists
		const resp2 = await request(app)
			.get("/user/user1")
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp2.statusCode).toBe(404);
	});

	it("throws an error if a user tries to delete another user's account", async () => {
		const u1Token = await GetUserToken();
		const resp = await request(app)
			.delete("/user/user2")
			.set("authorization", `Bearer ${u1Token}`)
			.send({
				password: "password2",
			});

		expect(resp.statusCode).toBe(403);
	});

	it("throws an error if the password provided is wrong or not provided", async () => {
		const u1Token = await GetUserToken();
		const resp = await request(app)
			.delete("/user/user1")
			.set("authorization", `Bearer ${u1Token}`)
			.send({
				password: "password2",
			});
		const resp2 = await request(app)
			.delete("/user/user1")
			.set("authorization", `Bearer ${u1Token}`)
			.send({});

		expect(resp.statusCode).toBe(400);
		expect(resp2.statusCode).toBe(400);
	});
});
