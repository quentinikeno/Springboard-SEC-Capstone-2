/** Games model */

const { BadRequestError400 } = require("../expressError");
const db = require("../db");

class Games {
	constructor({ id, name }) {
		this.id = id;
		this.name = name;
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
