const Challenges = require("../models/challenges");
const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const validateSchema = require("../helpers/validateSchema");
const challengesAddSchema = require("../schemas/challengesAdd.json");
const router = new express.Router();

/** All of these routes must ensure that the user is logged in. */
router.use(ensureLoggedIn);

/** GET /challenges
 * gets all of a user's challenges
 * returns [{id, friendsId, gameId, scoreToBeat, gameName, friendUsername}, ...]
 * authorization: logged in
 */
router.get("/", async (req, res, next) => {
	try {
		const challenges = await Challenges.getChallenges(res.locals.user.id);
		return res.json(challenges);
	} catch (error) {
		return next(error);
	}
});

/** POST /challenges
 * adds a new challenge for a user
 * returns { id, friendsId, gameId, scoreToBeat }
 * authorization: logged in
 */
router.post("/", async (req, res, next) => {
	try {
		validateSchema(req, challengesAddSchema);
		const challenges = await Challenges.add(req.body);
		return res.status(201).json(challenges);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
