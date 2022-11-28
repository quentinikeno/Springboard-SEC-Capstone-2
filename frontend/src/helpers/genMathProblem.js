export const randNum = (digits = 2) =>
	Math.floor(Math.random() * Math.pow(10, digits)) + 1;

export const findDivisor = (first, second, digits) => {
	if (first % second === 0) return { first, second, answer: first / second };

	const divisors = [];

	for (let i = 1; i < first / 2; i++) {
		if (first % i === 0) divisors.push(i);
	}

	const randIndex = Math.floor(Math.random() * divisors.length);
	second =
		Math.random() < 0.5 ? divisors[randIndex] : first / divisors[randIndex];
	return { first: first, second, answer: first / second };
};

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
		const { first, second, answer } = findDivisor(first, second, digits);
		const operation = "&divide;";
		const expression = `${first} ${operation} ${second}`;
		return { first, second, operation, expression, answer };
	}
};
