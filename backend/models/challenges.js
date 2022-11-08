/** Challenges model */

const { BadRequestError400 } = require("../expressError");
const db = require("../db");

class Challenges {
	constructor({ id, friendsId, gameId, scoreToBeat }) {
		this.id = id;
		this.friendsId = friendsId;
		this.gameId = gameId;
		this.scoreToBeat = scoreToBeat;
	}

	/** Given an user's ID, get all of their challenged.
	 * returns [{id, friendsId, gameId, scoreToBeat, gameName, friendUsername}, ...]
	 * returns an empty array if nothing found
	 */

	static async getChallenges(user_id) {
		try {
			// subquery in from statement selects the friends' user ids from the friends table
			const results = await db.query(
				`
			SELECT c.id, c.friends_id AS "friendsId", c.game_id AS "gameId", c.score_to_beat AS "scoreToBeat", g.name AS "gameName", u.username AS "friendUsername"
            FROM challenges AS c
            JOIN 
                (SELECT (CASE WHEN user_1_id <> $1 THEN user_1_id ELSE user_2_id END) AS friend_user_id, id
                FROM friends WHERE $1 IN (user_1_id , user_2_id)) AS f
            ON f.id = c.friends_id
            JOIN games AS g
            ON g.id = c.game_id
            JOIN users AS u
            ON u.id = f.friend_user_id
			`,
				[user_id]
			);

			return results.rows;
		} catch (error) {
			throw error;
		}
	}

	/** add a new challenge for a game
	 * returns instance of Challenges { id, friendsId, gameId, scoreToBeat }
	 */

	static async add({ friendsId, gameId, scoreToBeat }) {
		try {
			const results = await db.query(
				`
			INSERT INTO challenges (friends_id, game_id, score_to_beat)
			VALUES ($1, $2, $3)
			RETURNING id, friends_id AS "friendsId", game_id AS "gameId", score_to_beat AS "scoreToBeat"`,
				[friendsId, gameId, scoreToBeat]
			);

			return new Challenges(results.rows[0]);
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
	 * {deletedFriends: {user1Id, user2Id}}
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

			const deletedFriends = results.rows[0];

			if (!deletedFriends)
				throw new BadRequestError400(
					"These users don't have a pending friend request or aren't currently friends."
				);

			return { deletedFriends };
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Challenges;
