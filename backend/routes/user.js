const User = require("../models/user");
const express = require("express");
const { ensureLoggedIn, ensurePermittedUser } = require("../middleware/auth");
const { BadRequestError400 } = require("../expressError");
const validateSchema = require("../helpers/validateSchema");
const userPatchSchema = require("../schemas/userPatch.json");
const router = new express.Router();

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

/** PATCH user/[username]
 * returns { {id, username, joinAt, lastLoginAt} }
 * authorization: logged in and permitted user
 */

router.patch(
	"/:username",
	ensureLoggedIn,
	ensurePermittedUser,
	async (req, res, next) => {
		try {
			if (!req.params.username)
				throw new BadRequestError400("A username must be provided.");
			validateSchema(req, userPatchSchema);

			const user = await User.authenticate(
				req.params.username,
				req.body.oldPassword
			);
			const updatedUser = await user.update(req.body);

			return res.json(updatedUser);
		} catch (error) {
			return next(error);
		}
	}
);

module.exports = router;
