/** User class*/

const bcrypt = require("bcrypt");
const ExpressError = require("../expressError");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { sqlForPartialUpdate } = require("./helpers/sqlForUpdate");

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
		try {
			//Add json Schema later
			const hashedPassword = await bcrypt.hash(
				password,
				BCRYPT_WORK_FACTOR
			); // hash password
			const results = await db.query(
				`
			INSERT INTO users (username, password, email, join_at, last_login_at)
			VALUES ($1, $2, $3, current_timestamp, current_timestamp)
			RETURNING id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt"`,
				[username, hashedPassword, email]
			);
			return new User(results.rows[0]);
		} catch (error) {
			throw error;
		}
	}

	/** get all users
	 * returns [id, username, joinAt, lastLoginAt}, {id, username, joinAt, lastLoginAt}, ...]
	 */
	static async getAllUsers() {
		try {
			const results = await db.query(`
        SELECT id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt"
        FROM users
        ORDER BY id
        `);
			return results.rows.map((user) => new User(user));
		} catch (error) {
			throw error;
		}
	}

	/** checks if the username/password is valid
	 * returns user if authentication is successful, otherwise throws an error. */
	static async authenticate(username, password) {
		try {
			if (!username || !password) {
				throw new ExpressError(
					"Username and password are required.",
					400
				);
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

				if (isValid) {
					// return the user without the password
					delete user.password;
					const authedUser = new User(user);
					await authedUser.updateLoginTimeStamp();
					return authedUser;
				}
			}

			throw new ExpressError(
				"Could not authenticate.  Please make sure your username and password are correct.",
				400
			);
		} catch (error) {
			console.log(error);
			error;
		}
	}

	/** Get info on a specific user given a username
	 * returns an instance of User for the found user
	 */
	static async get(username) {
		const results = await db.query(
			`
		SELECT id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt"
		FROM users 
		WHERE username=$1
		`,
			[username]
		);

		const user = results.rows[0];

		if (!user)
			throw new ExpressError(`No user found with ${username}.`, 404);

		return new User(user);
	}

	/** Update user data
	 * returns new user instance
	 * data can include {username, email, password}
	 * not all fields are required
	 * make sure to call authenticate before updating
	 */

	async update(data) {
		try {
			// hash new password if applicable
			if (data.password) {
				data.password = await bcrypt.hash(
					data.password,
					BCRYPT_WORK_FACTOR
				);
			}

			const { setCols, values } = sqlForPartialUpdate(data);
			const usernameVarIdx = "$" + (values.length + 1);

			const querySql = `UPDATE users 
						  SET ${setCols} 
						  WHERE username = ${usernameVarIdx} 
						  RETURNING id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt"`;
			const result = await db.query(querySql, [...values, this.username]);
			const user = result.rows[0];

			if (!user)
				throw new ExpressError(`No user found with ${username}.`, 404);

			delete user.password;
			return new User(user);
		} catch (error) {
			throw error;
		}
	}

	/** Delete a user.  Make sure they are authenticated first.
	 * returns undefined. */

	async delete() {
		try {
			const result = await db.query(
				`
				DELETE
			   FROM users
			   WHERE username = $1
			   RETURNING username
			   `,
				[this.username]
			);

			const user = result.rows[0];

			if (!user)
				throw new ExpressError(`No user found with ${username}.`, 404);
		} catch (error) {
			throw error;
		}
	}

	/** Update the login timestamp to be the current time */

	async updateLoginTimeStamp() {
		try {
			const newLoginTime = await db.query(
				`
			UPDATE users
			SET last_login_at=current_timestamp
			WHERE username=$1
			RETURNING last_login_at`,
				[this.username]
			);

			this.lastLoginAt = newLoginTime;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = User;
