const Friends = require("../models/friends");
const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError400 } = require("../expressError");
const router = new express.Router();

/** All of these routes must ensure that the user is logged in. */
router.use(ensureLoggedIn);

/** GET friends/[pendingOrAccepted]
 * returns { {id, username, joinAt, lastLoginAt, isAdmin}, ... }
 * authorization: logged in
 */

router.get("/:pendingOrAccepted", async (req, res, next) => {
	try {
		const pendingOrAccepted = req.params.pendingOrAccepted.toLowerCase();

		if (pendingOrAccepted !== "pending" && pendingOrAccepted !== "accepted")
			throw new BadRequestError400(
				"The route parameter must be either 'pending' or 'accepted'."
			);

		const friends = await Friends.getFriends(
			res.locals.user.id,
			pendingOrAccepted === "accepted"
		);

		return res.json(friends);
	} catch (error) {
		return next(error);
	}
});

/** POST friends/[userId]
 * returns {id, user_1_id, user_2_id, accepted}
 * authorization: logged in
 */

router.post("/:userId", async (req, res, next) => {
	try {
		const friends = await Friends.add(
			res.locals.user.id,
			req.params.userId
		);

		return res.status(201).json(friends);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
