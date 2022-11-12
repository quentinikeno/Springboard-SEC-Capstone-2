const { sqlForPartialUpdate } = require("./sqlForUpdate");

describe("sqlForUpdate", () => {
	it("should return an object", () => {
		const sql = sqlForPartialUpdate({
			username: "test",
			password: "password",
			email: "test@email.com",
		});
		expect(sql).toEqual({
			setCols: '"username"=$1, "password"=$2, "email"=$3',
			values: ["test", "password", "test@email.com"],
		});
	});
});
