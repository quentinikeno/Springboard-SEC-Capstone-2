export const randNum = (max) => Math.floor(Math.random() * max) + 1;

export const genNum = (level, first) => {
	switch (level) {
		case 1:
			return randNum(4);
		case 2:
			return randNum(9);
		case 3:
			return first ? randNum(9) : randNum(99);
		case 3:
			return first ? randNum(9) : randNum(99);
		case 4:
			return randNum(99);
		case 5:
			return first ? randNum(999) : randNum(9);
		case 6:
			return first ? randNum(999) : randNum(99);
		case 7:
			return randNum(999);
		case 8:
			return first ? randNum(9999) : randNum(9);
		case 8:
			return first ? randNum(9999) : randNum(99);
		case 9:
			return first ? randNum(9999) : randNum(999);
		default:
			return randNum(9999);
	}
};

export const findDivisor = (first, second) => {
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

export const getMathProblem = (
	type,
	level,
	oldExpression,
	allowNegative = false
) => {
	let first = genNum(level, true);
	let second = genNum(level, false);
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
			let newDivisor = findDivisor(first, second);
			second = newDivisor.second;
			answer = newDivisor.answer;
			break;
		default:
			throw new Error("Type must be 'add', 'sub', 'mul', or 'div'.");
	}

	const expression = `${first} ${operation} ${second}`;

	if (expression === oldExpression)
		return getMathProblem(type, level, oldExpression, allowNegative);

	return { first, second, operation, expression, answer };
};
