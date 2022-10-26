/** Friends model */

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
			// check if users are already friends
			const friendsResults = await db.query(
				`
            SELECT id 
            FROM friends 
            WHERE (user_1_id = $1 AND user_2_id = $2) OR (user_2_id = $2 AND user_2_id = $1)
            `,
				[user_1_id, user_2_id]
			);

			if (friendsResults.rows.length)
				throw new BadRequestError400("Users are already friends.");

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
	 * returns array of instances of Friends class [{id, user_1_id, user_2_id, accepted}, ...]
	 * returns an empty array if nothing found
	 * the user's ID can be either user_1_id or user_2_id
	 */

	static async getFriends(user_id, accepted) {
		try {
			const results = await db.query(
				`
            SELECT id, user_1_id, user_2_id, accepted
            FROM friends 
            WHERE (user_1_id = $1 OR user_2_id = $1) AND accepted = $2
            `,
				[user_id, accepted]
			);

			// create array of friends instances
			const friends = results.rows.map((row) => new Friends(row));

			return friends;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Friends;
