const randNum = (digits = 2) =>
	Math.floor(Math.random() * Math.pow(10, digits)) + 1;

export const getMathProblem = (type, digits = 2) => {
	let first = randNum(digits);
	let second = randNum(digits);

	if (type === "add") {
		const operation = "+";
		const expression = `${first} ${operation} ${second}`;
		const answer = first + second;
		return { first, second, operation, expression, answer };
	}
};
