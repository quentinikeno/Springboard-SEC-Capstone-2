const express = require("express");
const ExpressError = require("../expressError");
const router = new express.Router();

router.get("/", (req, res, next) => {
	try {
		return res.json({ "is-working": true });
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
