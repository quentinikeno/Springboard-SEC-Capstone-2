const Games = require("../models/games");
const express = require("express");
const { ensureAdmin } = require("../middleware/auth");
const validateSchema = require("../helpers/validateSchema");
const gameAddSchema = require("../schemas/gameAdd.json");
const { BadRequestError400 } = require("../expressError");
const router = new express.Router();

/** All of these routes must ensure that the user is an admin. */
router.use(ensureAdmin);

/** GET /games/
 * returns {games: [ {id, name}, ... ]}
 * authorization: admin
 */

router.get("/", async (req, res, next) => {
	try {
		const games = await Games.getAll();
		return res.json({ games });
	} catch (error) {
		return next(error);
	}
});

/** GET /games/[id]
 * returns {id, name}
 * authorization: admin
 */

router.get("/:id", async (req, res, next) => {
	try {
		const game = await Games.get(req.params.id);
		return res.json(game);
	} catch (error) {
		return next(error);
	}
});

/** POST /games
 * returns {id, name}
 * authorization: admin
 */

router.post("/", async (req, res, next) => {
	try {
		validateSchema(req, gameAddSchema);
		const game = await Games.add(req.body.name);
		return res.status(201).json(game);
	} catch (error) {
		return next(error);
	}
});

/** PATCH /games/[id]
 * returns {id, name}
 * authorization: admin
 */

router.patch("/:id", async (req, res, next) => {
	try {
		validateSchema(req, gameAddSchema);
		const game = await Games.update(req.params.id, req.body.name);
		return res.json(game);
	} catch (error) {
		return next(error);
	}
});

/** DELETE /games/[id]
 * returns {deleted: Game(id, name)}
 * authorization: admin
 */

router.delete("/:id", async (req, res, next) => {
	try {
		const game = await Games.delete(req.params.id);
		return res.json(game);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;