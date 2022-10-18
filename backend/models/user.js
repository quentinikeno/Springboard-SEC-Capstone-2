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

	/** register new user -- returns
	 *    {id, username, joinAt, lastLoginAt}
	 */

	static async register({ username, email, password }) {
		//Add json Schema later
		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR); // hash password
		const results = await db.query(
			`
        INSERT INTO users (username, password, email, join_at, last_login_at)
        VALUES ($1, $2, $3, current_timestamp, current_timestamp)
        RETURNING id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt"`,
			[username, hashedPassword, email]
		);
		return results.rows[0];
	}

	/** get all users
	 * returns [id, username, joinAt, lastLoginAt}, {id, username, joinAt, lastLoginAt}, ...]
	 */
	static async getAllUsers() {
		const results = await db.query(`
        SELECT id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt"
        FROM users
        ORDER BY id
        `);
		return results.rows.map((user) => new User(user));
	}
}

module.exports = User;
