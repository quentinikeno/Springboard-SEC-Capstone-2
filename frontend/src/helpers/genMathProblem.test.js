import { randNum, findDivisor, getMathProblem } from "./genMathProblem";

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
		const result = getMathProblem("add");

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			operation: "&plus;",
			expression: `${result.first} ${result.operation} ${result.second}`,
			answer: result.first + result.second,
		});
	});

	it("should generate a random subtraction problem", () => {
		const result = getMathProblem("sub");

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			operation: "&minus;",
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
			operation: "&minus;",
			expression: `${result.first} ${result.operation} ${result.second}`,
			answer: result.first - result.second,
		});
	});

	it("should generate a random multiplication problem", () => {
		const result = getMathProblem("mul");

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			operation: "&times;",
			expression: `${result.first} ${result.operation} ${result.second}`,
			answer: result.first * result.second,
		});
	});

	it("should generate a random division problem", () => {
		const result = getMathProblem("div");

		expect(result).toEqual({
			first: expect.any(Number),
			second: expect.any(Number),
			operation: "&divide;",
			expression: `${result.first} ${result.operation} ${result.second}`,
			answer: result.first / result.second,
		});
	});

	it("should throw an error if the type is not add, sub, mul, or div", () => {
		const setBadType = () => {
			getMathProblem("bad");
		};
		expect(setBadType).toThrow(
			new Error("Type must be 'add', 'sub', 'mul', or 'div'.")
		);
	});
});
