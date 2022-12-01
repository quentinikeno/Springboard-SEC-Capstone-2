/** User_Games model */

const { NotFoundError404, BadRequestError400 } = require("../expressError");
const db = require("../db");

class Scores {
	constructor({ id, userId, gameId, highScore }) {
		this.id = id;
		this.userId = userId;
		this.gameId = gameId;
		this.highScore = highScore;
	}

	/** Gets a user's high score for all games.
	 * Returns array of objects with the [{id, userId, gameId, highScore, gameName}, ...]
	 */

	static async getAll(userId) {
		try {
			const results = await db.query(
				`
        SELECT scores.id, game_id AS "gameId", user_id AS "userId", high_score AS "highScore", games.name AS "gameName"
        FROM scores
        JOIN games
        ON scores.game_id = games.id
        WHERE user_id = $1
        `,
				[userId]
			);

			return results.rows;
		} catch (error) {
			throw error;
		}
	}

	/** Gets a user's high score for a specific game.
	 * Returns an instance of Scores.
	 */

	static async get(userId, gameId) {
		try {
			const results = await db.query(
				`
        SELECT id, game_id AS "gameId", user_id AS "userId", high_score AS "highScore"
        FROM scores
        WHERE user_id = $1 AND game_id = $2
        `,
				[userId, gameId]
			);

			const score = results.rows[0];

			if (!score) return { highScore: null };

			return new Scores(score);
		} catch (error) {
			throw error;
		}
	}

	/** Adds a user's high score for a game.
	 * Returns an instance of Score.
	 */

	static async add({ userId, gameId, highScore }) {
		try {
			const results = await db.query(
				`
        INSERT INTO scores (user_id, game_id, high_score)
        VALUES ($1, $2, $3)
        RETURNING id, game_id AS "gameId", user_id AS "userId", high_score AS "highScore"
        `,
				[userId, gameId, highScore]
			);

			return new Scores(results.rows[0]);
		} catch (error) {
			if (error.code === "23505")
				throw new BadRequestError400(
					`A high score already exists for user with ID ${userId} and game with ID ${gameId}.`
				);
			throw error;
		}
	}

	/** Adds a user's high score for a game.
	 * Returns an instance of Score.
	 */

	static async update({ userId, gameId, highScore }) {
		try {
			const results = await db.query(
				`
        UPDATE scores
        SET high_score = $3
        WHERE user_id = $1 AND game_id = $2
        RETURNING id, game_id AS "gameId", user_id AS "userId", high_score AS "highScore"
        `,
				[userId, gameId, highScore]
			);

			const score = results.rows[0];

			if (!score)
				throw new NotFoundError404(
					`Could not find high score for user with ID ${userId} and game with ID ${gameId}.`
				);

			return new Scores(score);
		} catch (error) {
			throw error;
		}
	}

	/** Deletes a user's high score for all games.
	 * Returns an object {deleted: Scores}
	 */

	static async delete(scoreId) {
		try {
			const results = await db.query(
				`
        DELETE
        FROM scores
        WHERE id = $1
        RETURNING id, game_id AS "gameId", user_id AS "userId", high_score AS "highScore"
        `,
				[scoreId]
			);

			const score = results.rows[0];

			if (!score)
				throw new NotFoundError404(
					`Could not find high score with id ${scoreId}.`
				);

			return { deleted: new Scores(score) };
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Scores;
