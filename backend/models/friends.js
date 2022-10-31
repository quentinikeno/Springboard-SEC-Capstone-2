/** Friends model */

const { BadRequestError400 } = require("../expressError");
const db = require("../db");
const User = require("./user");

class Friends {
	constructor({ id, user_1_id, user_2_id, accepted }) {
		this.id = id;
		this.user_1_id = user_1_id;
		this.user_2_id = user_2_id;
		this.accepted = accepted;
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

	/** add friends and send them a request
	 * returns instance of Friends class ({id, user_1_id, user_2_id, accepted})
	 */

	static async add(user_1_id, user_2_id) {
		try {
			if (user_1_id === user_2_id)
				throw new BadRequestError400("Both users's IDs' are the same.");

			const user2 = await db.query(
				`
			SELECT id
			FROM users
			WHERE id=$1`,
				[user_2_id]
			);

			if (!user2.rows[0])
				throw new BadRequestError400(
					"The user you are trying to add does not exist."
				);

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

	/** accepts two users' ID's and sets accepted to for their friend request to True
	 * returns a friends instance.
	 */

	static async accept(user_1_id, user_2_id) {
		try {
			const results = await db.query(
				`
			UPDATE friends
			SET accepted=true
			WHERE $1 IN (user_1_id , user_2_id) AND $2 IN (user_1_id , user_2_id)
			RETURNING id, user_1_id, user_2_id, accepted
			`,
				[user_1_id, user_2_id]
			);

			const request = results.rows[0];

			if (!request)
				throw new BadRequestError400(
					"These users don't have a pending friend request.  Please send a friend request first."
				);

			return new Friends(request);
		} catch (error) {
			throw error;
		}
	}

	/** accepts two users' ID's and deletes the friends
	 * returns the usernames of the former friends.
	 * {deleted: {user1Id, user2Id}}
	 */

	static async delete(user_1_id, user_2_id) {
		try {
			const results = await db.query(
				`
			DELETE
			FROM friends
			WHERE $1 IN (user_1_id , user_2_id) AND $2 IN (user_1_id , user_2_id)
			RETURNING user_1_id, user_2_id
			`,
				[user_1_id, user_2_id]
			);

			const deleted = results.rows[0];

			if (!deleted)
				throw new BadRequestError400(
					"These users don't have a pending friend request or aren't currently friends."
				);
			console.log(deleted);
			return { deleted };
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Friends;
