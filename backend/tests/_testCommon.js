"use strict";

const db = require("../db.js");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");

/** queries and functions to be run before all tests */
async function commonBeforeAll() {
	try {
		await db.query("DELETE FROM friends");
		await db.query("DELETE FROM users");

		await User.register({
			username: "user1",
			email: "user1@test.com",
			password: "password1",
		});

		await User.register({
			username: "user2",
			email: "user2@test.com",
			password: "password2",
		});

		await User.register({
			username: "user3",
			email: "user3@test.com",
			password: "password3",
		});
	} catch (error) {
		console.error(error);
	}
}

async function commonBeforeEach() {
	try {
		await db.query("BEGIN");
	} catch (error) {
		console.error(error);
	}
}

async function commonAfterEach() {
	try {
		await db.query("ROLLBACK");
	} catch (error) {
		console.error(error);
	}
}

async function commonAfterAll() {
	try {
		await db.end();
	} catch (error) {
		console.error(error);
	}
}

async function getUserToken(username = "user1", password = "password1") {
	const res = await request(app).post("/auth/login").send({
		username,
		password,
	});
	return res.body.token;
}

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	getUserToken,
};
