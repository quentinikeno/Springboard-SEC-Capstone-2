/** Games model */

const { BadRequestError400, NotFoundError404 } = require("../expressError");
const db = require("../db");

class Games {
	constructor({ id, name }) {
		this.id = id;
		this.name = name;
	}

	/** Gets all games from the database.
	 * Returns array of instances of Games
	 */

	static async getAll() {
		try {
			const results = await db.query(
				`
        SELECT id, name
        FROM games
        `
			);

			return results.rows.map((game) => new Games(game));
		} catch (error) {
			throw error;
		}
	}

	/** Gets a game with id from the database.
	 * Returns instance of Game
	 */

	static async get(id) {
		try {
			const results = await db.query(
				`
        SELECT id, name
        FROM games
        WHERE id=$1
        `,
				[id]
			);

			const game = results.rows[0];

			if (!game)
				throw new NotFoundError404(`No games found with id: ${id}.`);

			return new Games(game);
		} catch (error) {
			throw error;
		}
	}

	/** Adds a new game with "name" to the database.
	 * Returns instance of Game
	 */

	static async add(name) {
		try {
			const results = await db.query(
				`
        INSERT INTO games (name)
        VALUES ($1)
        RETURNING id, name
        `,
				[name]
			);

			return new Games(results.rows[0]);
		} catch (error) {
			throw error;
		}
	}

	/** Updates a game's name.
	 * Returns instance of Game
	 */

	static async update(id, newName) {
		try {
			const results = await db.query(
				`
        UPDATE games
        SET name=$2
        WHERE id=$1
        RETURNING id, name
        `,
				[id, newName]
			);

			const game = results.rows[0];

			if (!game)
				throw new NotFoundError404(`No games found with ID: ${id}.`);

			return new Games(game);
		} catch (error) {
			throw error;
		}
	}

	/** Deletes a game with "name" from the database.
	 * Returns {deleted: Game(id, name)}
	 */

	static async delete(id) {
		try {
			const results = await db.query(
				`
        DELETE
        FROM games
        WHERE id=$1
        RETURNING id, name
        `,
				[id]
			);

			const game = results.rows[0];

			if (!game)
				throw new NotFoundError404(`No games found with ID: ${id}.`);

			return { deleted: new Games(game) };
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Games;
