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
	return { first, second, answer: first / second };
};

export const getMathProblem = (type, digits = 2, allowNegative = false) => {
	let first = randNum(digits);
	let second = randNum(digits);
	let operation;
	let answer;

	switch (type) {
		case "add":
			operation = "+";
			answer = first + second;
			break;
		case "sub":
			if (first - second < 0 && !allowNegative) {
				[first, second] = [second, first];
			}
			operation = "-";
			answer = first - second;
			break;
		case "mul":
			operation = "×";
			answer = first * second;
			break;
		case "div":
			operation = "÷";
			let newDivisor = findDivisor(first, second, digits);
			second = newDivisor.second;
			answer = newDivisor.answer;
			break;
		default:
			throw new Error("Type must be 'add', 'sub', 'mul', or 'div'.");
	}

	const expression = `${first} ${operation} ${second}`;
	return { first, second, operation, expression, answer };
};
