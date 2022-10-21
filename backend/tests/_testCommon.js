const db = require("../db.js");
const User = require("../models/user");

/** queries and functions to be run before all tests */
async function commonBeforeAll() {
	await db.query("DELETE FROM users");

	await User.register({
		username: "user1",
		email: "user1@test.com",
		password: "password1",
	});
}

async function commonBeforeEach() {
	await db.query("BEGIN");
}

async function commonAfterEach() {
	await db.query("ROLLBACK");
}

async function commonAfterAll() {
	await db.end();
}

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
};
