/** Games model */

const { BadRequestError400, NotFoundError404 } = require("../expressError");
const db = require("../db");

class Games {
	constructor({ id, name }) {
		this.id = id;
		this.name = name;
	}

	/** Gets a game with "name" from the database.
	 * Returns instance of Game
	 */

	static async get(name) {
		try {
			const results = await db.query(
				`
        SELECT id, name
        FROM games
        WHERE name=$1
        `,
				[name]
			);

			const game = results.rows[0];

			if (!game)
				throw new NotFoundError404(
					`No games found with name: ${name}.`
				);

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
}

module.exports = Games;
