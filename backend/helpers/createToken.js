const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** Create a JWT from the user's username and sign it. */

function createToken(user) {
	// pass in user instance
	const payload = {
		id: user.id,
		username: user.username,
		isAdmin: user.isAdmin,
	};
	// return signed JWT
	return jwt.sign(payload, SECRET_KEY);
}

module.exports = createToken;
