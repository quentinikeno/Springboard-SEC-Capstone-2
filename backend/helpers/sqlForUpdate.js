const ExpressError = require("../expressError");
const { BadRequestError400 } = require("../expressError");

/** Create an object with the cols to set and values to update in a SQL Update query.
 *
 * For users, dataToUpdate can include: { username, password, email }
 *
 *  Returns { setCols, values }
 */

function sqlForPartialUpdate(dataToUpdate) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError400("No data");

	// {email: 'test@username.com', username: 'coolguy47'} => ['"email"=$1', '"username"=$2']
	const cols = keys.map((colName, idx) => `"${colName}"=$${idx + 1}`);

	return {
		setCols: cols.join(", "),
		values: Object.values(dataToUpdate),
	};
}

module.exports = { sqlForPartialUpdate };
