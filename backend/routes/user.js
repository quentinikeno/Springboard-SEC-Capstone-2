const User = require("../models/user");
const express = require("express");
const { ensureLoggedIn, ensurePermittedUser } = require("../middleware/auth");
const { BadRequestError400 } = require("../expressError");
const validateSchema = require("../helpers/validateSchema");
const userPatchSchema = require("../schemas/userPatch.json");
const router = new express.Router();

/** All of these routes must ensure that the user is logged in. */
router.use(ensureLoggedIn);

/** GET user/[username]
 * returns { {id, username, joinAt, lastLoginAt, isAdmin} }
 * authorization: logged in
 */

router.get("/:username", async (req, res, next) => {
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
 * returns { {id, username, joinAt, lastLoginAt, isAdmin} }
 * authorization: logged in and permitted user
 */

router.patch("/:username", ensurePermittedUser, async (req, res, next) => {
	try {
		if (!req.params.username)
			throw new BadRequestError400("A username must be provided.");
		validateSchema(req, userPatchSchema);

		const user = req.body.newPassword
			? await User.authenticate(req.params.username, req.body.oldPassword)
			: await User.get(req.params.username);
		const updatedUser = await user.update(req.body);

		return res.json(updatedUser);
	} catch (error) {
		return next(error);
	}
});

/** DELETE user/[username]
 * returns { deleted: username }
 * authorization: logged in and permitted user
 */

router.delete("/:username", ensurePermittedUser, async (req, res, next) => {
	try {
		const { username } = req.params;
		const { password } = req.body;
		if (!username)
			throw new BadRequestError400("A username must be provided.");
		if (!password)
			throw new BadRequestError400(
				"Your account's password is required."
			);

		const user = await User.authenticate(username, password);
		const { username: deleted } = await user.delete(req.body); // deleted user's username

		return res.json({ deleted });
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
