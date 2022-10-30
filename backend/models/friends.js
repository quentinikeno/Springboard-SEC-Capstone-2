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
	 */

	static async delete(user_1_id, user_2_id) {
		try {
			const results = await db.query(
				`
			DELETE
			FROM friends
			WHERE $1 IN (user_1_id , user_2_id) AND $2 IN (user_1_id , user_2_id)
			RETURNING user_1_id AS "user1Id", user_2_id AS "user2Id"
			`,
				[user_1_id, user_2_id]
			);

			const friends = results.rows[0];

			if (!friends)
				throw new BadRequestError400(
					"These users don't have a pending friend request or aren't currently friends."
				);

			return friends;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Friends;
