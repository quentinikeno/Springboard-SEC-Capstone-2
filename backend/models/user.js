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

	/** register new user
	 *  returns {id, username, joinAt, lastLoginAt}
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
		return new User(results.rows[0]);
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

	/** checks if the username/password is valid
	 * returns user if authentication is successful, otherwise throws an error. */
	static async authenticate(username, password) {
		if (!username || !password) {
			throw new ExpressError("Username and password are required.", 400);
		}

		// try to find user first
		const results = await db.query(
			`
		SELECT id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt", password 
    	FROM users 
    	WHERE username=$1
		`,
			[username]
		);

		const user = results.rows[0];

		if (user) {
			const isValid = await bcrypt.compare(password, user.password); //compare hashed password
			delete user.password;
			if (isValid) return new User(user); // return the user without the password
		}

		throw new ExpressError("Could not find user with that username.", 404);
	}
}

module.exports = User;
