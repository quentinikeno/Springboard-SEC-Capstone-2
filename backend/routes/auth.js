/** Routes for authentication. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const createToken = require("../helpers/createToken");
const validateSchema = require("../helpers/validateSchema");
const userLoginSchema = require("../schemas/userLogin.json");
const userRegisterSchema = require("../schemas/userRegister.json");

/** POST /auth/register { username, email, password }
 * returns JWT {token}
 */

router.post("/register", async (req, res, next) => {
	try {
		validateSchema(req, userRegisterSchema);
		const user = await User.register(req.body);
		const token = createToken(user);

		return res.status(201).json({ token, user });
	} catch (error) {
		return next(error);
	}
});

/** POST /auth/login {username, password}
 * returns JWT {token}
 */

router.post("/login", async (req, res, next) => {
	try {
		validateSchema(req, userLoginSchema);
		const { username, password } = req.body;
		const user = await User.authenticate(username, password);
		const token = createToken(user);

		return res.json({ token, user });
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
