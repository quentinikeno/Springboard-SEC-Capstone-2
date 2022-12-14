// read .env files and make environmental variables

require("dotenv").config();

// connection string with db username and password
const CONNECTION_STRING = process.env.CONNECTION_STRING || "";

const DB_URI =
	process.env.NODE_ENV === "test"
		? `postgresql://${CONNECTION_STRING}/math_games_test`
		: process.env.DATABASE_URL ||
		  `postgresql://${CONNECTION_STRING}/math_games`;

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = 12;

const PORT = +process.env.PORT || 5000;

module.exports = {
	DB_URI,
	SECRET_KEY,
	BCRYPT_WORK_FACTOR,
	PORT,
};
