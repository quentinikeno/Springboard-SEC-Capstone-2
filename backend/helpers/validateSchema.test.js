const validateSchema = require("./validateSchema");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError400 } = require("../expressError");

describe("validateSchema", () => {
	it("validates a correct schema", () => {
		req = {
			body: {
				username: "reggieStir",
				email: "registerMe@email.com",
				password: "register",
			},
		};
		validateSchema(req, userRegisterSchema);
	});

	it("throws an error for an invalid request", () => {
		req = {
			body: {
				username: 2,
				email: "bogus.email",
				password: 99,
			},
		};

		() => {
			expect(validateSchema(req, userRegisterSchema)).toThrow(
				BadRequestError400
			);
		};
	});
});
