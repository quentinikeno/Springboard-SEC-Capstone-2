export const randNum = (digits = 2) =>
	Math.floor(Math.random() * Math.pow(10, digits)) + 1;

export const getMathProblem = (type, digits = 2, allowNegative = false) => {
	let first = randNum(digits);
	let second = randNum(digits);

	if (type === "add") {
		const operation = "&plus;";
		const expression = `${first} ${operation} ${second}`;
		const answer = first + second;
		return { first, second, operation, expression, answer };
	} else if (type === "sub") {
		if (first - second < 0 && !allowNegative) {
			[first, second] = [second, first];
		}
		const operation = "&minus;";
		const expression = `${first} ${operation} ${second}`;
		const answer = first - second;
		return { first, second, operation, expression, answer };
	} else if (type === "mult") {
		const operation = "&times;";
		const expression = `${first} ${operation} ${second}`;
		const answer = first * second;
		return { first, second, operation, expression, answer };
	} else if (type === "div") {
		const operation = "&divide;";
		const expression = `${first} ${operation} ${second}`;
		const answer = first * second;
		return { first, second, operation, expression, answer };
	}
};
