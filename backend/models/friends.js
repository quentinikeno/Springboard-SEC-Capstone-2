/** Friends model */

const User = require("./user");
const { BadRequestError400 } = require("../expressError");
const db = require("../db");

class Friends {
	constructor({ id, user_1_id, user_2_id, accepted }) {
		this.id = id;
		this.user_1_id = user_1_id;
		this.user_2_id = user_2_id;
		this.accepted = accepted;
	}

	/** add friends and send them a request
	 * returns instance of Friends class ({id, user_1_id, user_2_id, accepted})
	 */

	static async add(user_1_id, user_2_id) {
		try {
			if (user_1_id === user_2_id)
				throw new BadRequestError400("Both users's IDs' are the same.");

			const results = await db.query(
				`
			INSERT INTO friends (user_1_id, user_2_id, accepted)
			VALUES ($1, $2, $3)
			RETURNING id, user_1_id, user_2_id, accepted`,
				[user_1_id, user_2_id, false]
			);

			return new Friends(results.rows[0]);
		} catch (error) {
			throw error;
		}
	}

	/** accepts a friend request and sets accepted to True
	 * returns true if accepted
	 */

	async accept() {
		try {
			const results = await db.query(
				`
			UPDATE friends
			SET accepted=$1
			WHERE id=$2
			RETURNING accepted
			`,
				[true, this.id]
			);

			const { accepted } = results.rows[0];
			this.accepted = accepted;

			return accepted;
		} catch (error) {
			throw error;
		}
	}

	/** Given an user's ID, get all of their accepted or pending friends.  The accepted status is a boolean.
	 * returns array of instances of Users class for each friend [{id, user_1_id, user_2_id, accepted}, ...]
	 * returns an empty array if nothing found
	 * the user's ID can be either user_1_id or user_2_id
	 */

	static async getFriends(user_id, accepted) {
		try {
			// subquery in from statement selects the friends' user ids from the friends table
			const results = await db.query(
				`
			SELECT users.id, users.username, users.join_at AS "joinAt", users.last_login_at AS "lastLoginAt", users.is_admin AS "isAdmin"
			FROM (SELECT (CASE WHEN user_1_id <> $1 THEN user_1_id ELSE user_2_id END) AS friend_user_id FROM friends WHERE $1 IN (user_1_id , user_2_id) AND accepted = $2) AS friends_ids
			INNER JOIN users ON users.id = friends_ids.friend_user_id
			`,
				[user_id, accepted]
			);

			// create array of users instances
			const friends = results.rows.map((row) => new User(row));

			return friends;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Friends;
