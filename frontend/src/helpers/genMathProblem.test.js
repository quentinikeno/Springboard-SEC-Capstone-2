import { randNum, findDivisor } from "./genMathProblem";

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

describe("test findDivisor", () => {
	it("should return the first and second numbers as is, along with the answer if the second is a divisor of the first", () => {
		expect(findDivisor(10, 5, 2)).toEqual({
			first: 10,
			second: 5,
			answer: 2,
		});
	});
	it("should generate a random divisor between two numbers", () => {
		const result = findDivisor(27, 8, 2);
		const { first, second, answer } = result;
		console.log(result);
		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			answer: expect.any(Number),
		});
		expect(first / second).toBe(answer);
		expect(first % second).toBe(0);
	});
});
