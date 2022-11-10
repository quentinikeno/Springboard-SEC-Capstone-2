const Challenges = require("../models/challenges");
const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const validateSchema = require("../helpers/validateSchema");
const challengesAddSchema = require("../schemas/challengesAdd.json");
const challengesUpdateSchema = require("../schemas/challengesUpdate.json");
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

/** PATCH /challenges/:id
 * updates a challenge for a user
 * returns { id, friendsId, gameId, scoreToBeat }
 * authorization: logged in
 */
router.patch("/:id", async (req, res, next) => {
	try {
		validateSchema(req, challengesUpdateSchema);
		const challenge = await Challenges.update(
			req.params.id,
			req.body.scoreToBeat
		);
		return res.json(challenge);
	} catch (error) {
		return next(error);
	}
});

/** DELETE /challenges/:id
 * deletes a challenge for a user
 * returns {deleted: { id, friendsId, gameId, scoreToBeat }}
 * authorization: logged in
 */
router.delete("/:id", async (req, res, next) => {
	try {
		const deleted = await Challenges.delete(req.params.id);
		return res.json(deleted);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
