import { randNum } from "./genMathProblem";

describe("test randNum", () => {
	it("should generate a random number up to two digits by default", () => {
		const num = randNum();
		expect(num).toEqual(expect.any(Number));
		expect(num).toBeLessThanOrEqual(100);
	});
	it("should generate a random number up to one digit", () => {
		const num = randNum(1);
		expect(num).toEqual(expect.any(Number));
		expect(num).toBeLessThanOrEqual(10);
	});
	it("should generate a random number up to three digits", () => {
		const num = randNum(3);
		expect(num).toEqual(expect.any(Number));
		expect(num).toBeLessThanOrEqual(1000);
	});
	it("should return 1 if 0 passed as param", () => {
		const num = randNum(0);
		expect(num).toEqual(1);
	});
});
