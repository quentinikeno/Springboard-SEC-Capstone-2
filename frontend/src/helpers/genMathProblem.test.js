import { randNum, findDivisor, getMathProblem } from "./genMathProblem";

describe("test randNum", () => {
	it("should generate a random number up to one digit", () => {
		const num = randNum(9);
		expect(num).toEqual(expect.any(Number));
		expect(num).toBeLessThanOrEqual(9);
	});
	it("should generate a random number up to three digits", () => {
		const num = randNum(999);
		expect(num).toEqual(expect.any(Number));
		expect(num).toBeLessThanOrEqual(999);
	});
});

describe("test findDivisor", () => {
	it("should return the first and second numbers as is, along with the answer if the second is a divisor of the first", () => {
		expect(findDivisor(10, 5)).toEqual({
			first: 10,
			second: 5,
			answer: 2,
		});
	});
	it("should generate a random divisor between two numbers", () => {
		const result = findDivisor(27, 8);
		const { first, second, answer } = result;

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			answer: expect.any(Number),
		});
		expect(first / second).toBe(answer);
		expect(first % second).toBe(0);
	});

	it("should generate a random divisor between two numbers", () => {
		const result = findDivisor(2, 8);
		const { first, second, answer } = result;

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			answer: expect.any(Number),
		});
		expect(first / second).toBe(answer);
		expect(first % second).toBe(0);
	});
});

describe("test getMathProblem", () => {
	it("should generate a random addition problem", () => {
		const result = getMathProblem("add", 5);

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			operation: "+",
			expression: `${result.first} ${result.operation} ${result.second}`,
			answer: result.first + result.second,
		});
	});

	it("should generate a random subtraction problem", () => {
		const result = getMathProblem("sub", 5);

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			operation: "-",
			expression: `${result.first} ${result.operation} ${result.second}`,
			answer: result.first - result.second,
		});
		expect(result.answer).toBeGreaterThan(0);
	});

	it("should generate a random subtraction problem with negative answers", () => {
		const result = getMathProblem("sub", 2, true);

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			operation: "-",
			expression: `${result.first} ${result.operation} ${result.second}`,
			answer: result.first - result.second,
		});
	});

	it("should generate a random multiplication problem", () => {
		const result = getMathProblem("mul", 5);

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			operation: "×",
			expression: `${result.first} ${result.operation} ${result.second}`,
			answer: result.first * result.second,
		});
	});

	it("should generate a random division problem", () => {
		const result = getMathProblem("div", 5);

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			operation: "÷",
			expression: `${result.first} ${result.operation} ${result.second}`,
			answer: result.first / result.second,
		});
	});

	it("should throw an error if the type is not add, sub, mul, or div", () => {
		const setBadType = () => {
			getMathProblem("bad", 5);
		};
		expect(setBadType).toThrow(
			new Error("Type must be 'add', 'sub', 'mul', or 'div'.")
		);
	});
});
