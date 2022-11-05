const Scores = require("../models/scores");
const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const validateSchema = require("../helpers/validateSchema");
const scoreAddSchema = require("../schemas/scoreAdd.json");
const router = new express.Router();

/** All of these routes must ensure that the user is logged in. */
router.use(ensureLoggedIn);

/** POST /scores
 * Add a new high score for a logged in user
 * returns {id, userId, gameId, highScore}
 * authorization: logged in
 */
router.post("/", async (req, res, next) => {
	try {
		validateSchema(req, scoreAddSchema);

		const score = await Scores.add({
			...req.body,
			userId: res.locals.user.id,
		});

		return res.status(201).json(score);
	} catch (error) {
		return next(error);
	}
});

/** PATCH /scores
 * Updates a high score for a logged in user
 * returns {id, userId, gameId, highScore}
 * authorization: logged in
 */
router.patch("/", async (req, res, next) => {
	try {
		validateSchema(req, scoreAddSchema);

		const score = await Scores.update({
			...req.body,
			userId: res.locals.user.id,
		});

		return res.json(score);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
