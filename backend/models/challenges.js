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

	/** Updates a challenge score
	 * returns a Challenges instance.
	 */

	static async update(id, score) {
		try {
			const results = await db.query(
				`
			UPDATE challenges
			SET score_to_beat = $1
			WHERE id = $2
			RETURNING id, friends_id AS "friendsId", game_id AS "gameId", score_to_beat AS "scoreToBeat"
			`,
				[score, id]
			);

			return new Challenges(results.rows[0]);
		} catch (error) {
			throw error;
		}
	}

	/** accepts a challenge ID and deletes it
	 * returns the Challenge instance that was deleted.
	 * {deletedChallenge: { id, friendsId, gameId, scoreToBeat }}
	 */

	static async delete(id) {
		try {
			const results = await db.query(
				`
			DELETE
			FROM challenges
			WHERE id = $1
			RETURNING id, friends_id AS "friendsId", game_id AS "gameId", score_to_beat AS "scoreToBeat"
			`,
				[id]
			);

			const deletedChallenge = results.rows[0];

			if (!deletedChallenge)
				throw new BadRequestError400("This challenge does not exist.");

			return { deletedChallenge };
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Challenges;
