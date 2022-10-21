/** Routes for authentication. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/createToken");
const { BadRequestError400 } = require("../expressError");

/** POST /auth/register { username, email, password }
 * returns JWT {token}
 */

router.post("/register", async (req, res, next) => {
	try {
		const { username, password, email } = req.body;
		const user = await User.register({ username, password, email });
		const token = createToken(user);

		return res.json({ token });
	} catch (error) {
		return next(error);
	}
});

/** POST /auth/login {username, password}
 * returns JWT {token}
 */

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.authenticate(username, password);
		const token = createToken(user);

		return res.json({ token });
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
