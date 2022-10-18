/** User class*/

const bcrypt = require("bcrypt");
const ExpressError = require("../expressError");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
	constructor({ id, username, joinAt, lastLoginAt }) {
		this.id = id;
		this.username = username;
		this.joinAt = joinAt;
		this.lastLoginAt = lastLoginAt;
	}

	/** return all users
	 * => [id, username, joinAt, lastLoginAt}, {id, username, joinAt, lastLoginAt}, ...]
	 */
	static async getAllUsers() {
		const results = await db.query(`
        SELECT id, username, join_at AS "joinAt", last_login_at AS lastLoginAt
        FROM users
        ORDER BY id
        `);
		return results.rows.map((user) => new User(user));
	}
}
