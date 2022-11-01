"use strict";

const db = require("../db.js");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Friends = require("../models/friends");
const Games = require("../models/games");

/** queries and functions to be run before all tests */

async function commonBeforeAll() {
	await Promise.allSettled([
		db.query("DELETE FROM friends"),
		db.query("DELETE FROM users"),
		User.register({
			username: "user1",
			email: "user1@test.com",
			password: "password1",
		}),
		User.register({
			username: "user2",
			email: "user2@test.com",
			password: "password2",
		}),
		User.register({
			username: "user3",
			email: "user3@test.com",
			password: "password3",
		}),
		Games.add("testGame"),
	]);
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
	try {
		const res = await request(app).post("/auth/login").send({
			username,
			password,
		});
		return res.body.token;
	} catch (error) {
		console.error(error);
	}
}

async function getTestUser(user = "user1") {
	try {
		return await User.get(user);
	} catch (error) {
		console.error(error);
	}
}

async function requestFriends(username1 = "user1", username2 = "user2") {
	try {
		const user1 = await getTestUser(username1);
		const user2 = await getTestUser(username2);
		const request = await Friends.add(user1.id, user2.id);
		return { user1, user2, request };
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	getUserToken,
	getTestUser,
	requestFriends,
};
