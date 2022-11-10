"use strict";

const db = require("../db.js");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Friends = require("../models/friends");
const Games = require("../models/games");
const Scores = require("../models/scores");
const Challenges = require("../models/challenges");

/** queries and functions to be run before all tests */

async function commonBeforeAll() {
	try {
		await Promise.all([
			db.query("DELETE FROM users"),
			db.query("DELETE FROM friends"),
			db.query("DELETE FROM games"),
			db.query("DELETE FROM scores"),
			db.query("DELETE FROM challenges"),
		]);

		await Promise.allSettled([
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
			User.register({
				username: "admin",
				email: "admin@test.com",
				password: "admin",
				isAdmin: true,
			}),
			Games.add("testGame"),
		]);
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

async function requestFriendsAPI(accept = false) {
	try {
		const u1Token = await getUserToken();
		const { body: user2 } = await request(app)
			.get("/user/user2")
			.set("authorization", `Bearer ${u1Token}`);
		const resp = await request(app)
			.post(`/friends/${user2.id}`)
			.set("authorization", `Bearer ${u1Token}`);
		let acceptedResp;
		if (accept) {
			acceptedResp = await request(app)
				.patch(`/friends/${user2.id}`)
				.set("authorization", `Bearer ${u1Token}`);
		}
		return { u1Token, user2, resp, acceptedResp };
	} catch (error) {
		console.error(error);
	}
}

async function addScore() {
	try {
		const adminToken = await getUserToken("admin", "admin");
		const u1Token = await getUserToken();
		const gamesResp = await request(app)
			.get("/games")
			.set("authorization", `Bearer ${adminToken}`);
		const testGameId = gamesResp.body.games[0].id;
		const resp = await request(app)
			.post("/scores")
			.set("authorization", `Bearer ${u1Token}`)
			.send({ gameId: testGameId, highScore: 1000 });
		return { u1Token, testGameId, score: resp.body, status: resp.status };
	} catch (error) {
		console.error(error);
	}
}

async function addTestGame() {
	try {
		const [testGame] = await Games.getAll();
		const testUser = await getTestUser();
		const score = await Scores.add({
			userId: testUser.id,
			gameId: testGame.id,
			highScore: 100,
		});
		return { testGame, testUser, score };
	} catch (error) {
		console.error(error);
	}
}

async function addChallenge() {
	try {
		const { request } = await requestFriends();
		const [testGame] = await Games.getAll();
		const challenge = await Challenges.add({
			friendsId: request.id,
			gameId: testGame.id,
			scoreToBeat: 1000,
		});
		return { request, testGame, challenge };
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
	requestFriendsAPI,
	addScore,
	addTestGame,
	addChallenge,
};
