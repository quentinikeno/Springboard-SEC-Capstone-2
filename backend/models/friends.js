/** Friends model */

const { NotFoundError404, BadRequestError400 } = require("../expressError");
const db = require("../db");

class Friends {
	constructor(id, user_1_id, user_2_id, accepted = false) {
		this.id = id;
		this.user_1_id = user_1_id;
		this.user_2_id = user_2_id;
		this.accepted = accepted;
	}
}

module.exports = Friends;
