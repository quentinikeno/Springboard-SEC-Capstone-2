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

console.log("Config:");
console.log("SECRET_KEY:", SECRET_KEY);
console.log("BCRYPT_WORK_FACTOR", BCRYPT_WORK_FACTOR);
console.log("Database:", DB_URI);
console.log("---");

module.exports = {
	DB_URI,
	SECRET_KEY,
	BCRYPT_WORK_FACTOR,
};
