/** User model*/

const bcrypt = require("bcrypt");
const {
	NotFoundError404,
	BadRequestError400,
	ConflictError409,
} = require("../expressError");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { sqlForPartialUpdate } = require(".././helpers/sqlForUpdate");

class User {
	constructor({ id, username, joinAt, lastLoginAt, isAdmin }) {
		this.id = id;
		this.username = username;
		this.joinAt = joinAt;
		this.lastLoginAt = lastLoginAt;
		this.isAdmin = isAdmin;
	}

	/** register new user
	 *  returns {id, username, joinAt, lastLoginAt}
	 */

	static async register({ username, email, password, isAdmin = false }) {
		try {
			const hashedPassword = await bcrypt.hash(
				password,
				BCRYPT_WORK_FACTOR
			); // hash password
			const results = await db.query(
				`
			INSERT INTO users (username, password, email, join_at, last_login_at, is_admin)
			VALUES ($1, $2, $3, current_timestamp, current_timestamp, $4)
			RETURNING id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt", is_admin AS "isAdmin"`,
				[username, hashedPassword, email, isAdmin]
			);
			return new User(results.rows[0]);
		} catch (error) {
			if (error.code === "23505") {
				if (error.constraint === "users_username_key")
					throw new ConflictError409(
						`A user with ${username} already exists.  Please choose another username.`
					);
				if (error.constraint === "users_email_key")
					throw new ConflictError409(
						`${email} is already being used.  Please use another email.`
					);
			}
			throw error;
		}
	}

	/** get all users
	 * returns [id, username, joinAt, lastLoginAt}, {id, username, joinAt, lastLoginAt}, ...]
	 */
	static async getAllUsers() {
		try {
			const results = await db.query(`
        SELECT id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt", is_admin AS "isAdmin"
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
				throw new BadRequestError400(
					"Username and password are required."
				);
			}

			// try to find user first
			const results = await db.query(
				`
			SELECT id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt", password, is_admin AS "isAdmin"
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

				// throw error if password invalid
				throw new BadRequestError400(
					"Could not authenticate.  Please make sure your username and password are correct."
				);
			}

			throw new NotFoundError404(
				"We couldn't find a user with that username.  Please make sure your username is correct or sign up for an account."
			);
		} catch (error) {
			throw error;
		}
	}

	/** Get info on a specific user given a username
	 * returns an instance of User for the found user
	 */
	static async get(username) {
		const results = await db.query(
			`
		SELECT id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt", is_admin AS "isAdmin"
		FROM users 
		WHERE username=$1
		`,
			[username]
		);

		const user = results.rows[0];

		if (!user)
			throw new NotFoundError404(
				`No user found with username: ${username}.`,
				404
			);

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
			if (data.newPassword) {
				data.password = await bcrypt.hash(
					data.newPassword,
					BCRYPT_WORK_FACTOR
				);
				delete data.newPassword;
			}

			delete data.oldPassword; // delete old password used for auth

			const { setCols, values } = sqlForPartialUpdate(data);
			const usernameVarIdx = "$" + (values.length + 1);

			const querySql = `UPDATE users 
						  SET ${setCols} 
						  WHERE username = ${usernameVarIdx} 
						  RETURNING id, username, join_at AS "joinAt", last_login_at AS "lastLoginAt", is_admin AS "isAdmin"`;
			const result = await db.query(querySql, [...values, this.username]);
			const user = result.rows[0];

			if (!user)
				throw new NotFoundError404(
					`No user found with username: ${username}.`,
					404
				);

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
				throw new NotFoundError404(
					`No user found with username: ${username}.`
				);

			return user;
		} catch (error) {
			throw error;
		}
	}

	/** Update the login timestamp to be the current time */

	async updateLoginTimeStamp() {
		try {
			const result = await db.query(
				`
			UPDATE users
			SET last_login_at=current_timestamp
			WHERE username=$1
			RETURNING last_login_at`,
				[this.username]
			);

			const newLoginTime = result.rows[0].last_login_at;

			this.lastLoginAt = newLoginTime;
		} catch (error) {
			throw error;
		}
	}

	/** Get all of a users accepted or pending friends.  The accepted status is a boolean.
	 * returns array of instances of Users class for each friend [{id, user_1_id, user_2_id, accepted}, ...]
	 * returns an empty array if nothing found
	 */

	async getFriends(accepted) {
		try {
			// subquery in from statement selects the friends' user ids from the friends table
			const results = await db.query(
				`
			SELECT users.id, users.username, users.join_at AS "joinAt", users.last_login_at AS "lastLoginAt", users.is_admin AS "isAdmin"
			FROM (SELECT (CASE WHEN user_1_id <> $1 THEN user_1_id ELSE user_2_id END) AS friend_user_id FROM friends WHERE $1 IN (user_1_id , user_2_id) AND accepted = $2) AS friends_ids
			INNER JOIN users ON users.id = friends_ids.friend_user_id
			`,
				[this.id, accepted]
			);

			// create array of users instances
			const friends = results.rows.map((row) => new User(row));

			return friends;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = User;
