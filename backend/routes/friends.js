const Friends = require("../models/friends");
const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError400 } = require("../expressError");
const router = new express.Router();

/** All of these routes must enruse that the user is logged in. */
router.use(ensureLoggedIn);

/** GET user/[username]
 * returns { {id, username, joinAt, lastLoginAt} }
 * authorization: logged in
 */

router.get("/:username", ensureLoggedIn, async (req, res, next) => {
	try {
		if (!req.params.username)
			throw new BadRequestError400("A username must be provided.");
		const user = await User.get(req.params.username);

		return res.json(user);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
