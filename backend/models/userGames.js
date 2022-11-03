/** User_Games model */

const { NotFoundError404 } = require("../expressError");
const db = require("../db");

class UserGames {
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
        SELECT user_games.id, game_id AS "gameId", user_id AS "userId", high_score AS "highScore", games.name AS "gameName"
        FROM user_games
        JOIN games
        ON user_games.game_id = games.id
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
	 * Returns an instance of UserGames.
	 */

	static async get(userId, gameId) {
		try {
			const results = await db.query(
				`
        SELECT id, game_id AS "gameId", user_id AS "userId", high_score AS "highScore"
        FROM user_games
        WHERE user_id = $1 AND game_id = $2
        `,
				[userId, gameId]
			);

			const userGame = results.rows[0];

			if (!userGame)
				throw new NotFoundError404(
					`Could not find high score for user with ID ${userId} and game with ID ${gameId}.`
				);

			return new UserGames(userGame);
		} catch (error) {
			throw error;
		}
	}

	/** Adds a user's high score for a game.
	 * Returns an instance of userGame.
	 */

	static async add({ userId, gameId, highScore }) {
		try {
			const results = await db.query(
				`
        INSERT INTO user_games (user_id, game_id, high_score)
        VALUES ($1, $2, $3)
        RETURNING id, game_id AS "gameId", user_id AS "userId", high_score AS "highScore"
        `,
				[userId, gameId, highScore]
			);

			return new UserGames(results.rows[0]);
		} catch (error) {
			throw error;
		}
	}

	/** Adds a user's high score for a game.
	 * Returns an instance of userGame.
	 */

	static async update({ userId, gameId, highScore }) {
		try {
			const results = await db.query(
				`
        UPDATE user_games
        SET high_score = $3
        WHERE user_id = $1 AND game_id = $2
        RETURNING id, game_id AS "gameId", user_id AS "userId", high_score AS "highScore"
        `,
				[userId, gameId, highScore]
			);

			const userGame = results.rows[0];

			if (!userGame)
				throw new NotFoundError404(
					`Could not find high score for user with ID ${userId} and game with ID ${gameId}.`
				);

			return new UserGames(userGame);
		} catch (error) {
			throw error;
		}
	}

	/** Deletes a user's high score for all games.
	 * Returns an object {deleted: UserGames}
	 */

	static async delete(userId, gameId) {
		try {
			const results = await db.query(
				`
        DELETE
        FROM user_games
        WHERE user_id = $1 AND game_id = $2
        RETURNING id, game_id AS "gameId", user_id AS "userId", high_score AS "highScore"
        `,
				[userId, gameId]
			);

			const userGame = results.rows[0];

			if (!userGame)
				throw new NotFoundError404(
					`Could not find high score for user with ID ${userId} and game with ID ${gameId}.`
				);

			return { deleted: new UserGames(userGame) };
		} catch (error) {
			throw error;
		}
	}
}

module.exports = UserGames;
