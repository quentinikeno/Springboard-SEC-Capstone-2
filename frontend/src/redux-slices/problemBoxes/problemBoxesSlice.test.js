import { store } from "../../store/store";
import {
	decrementSeconds,
	incrementLevel,
	incrementIncorrectGuesses,
	incrementSolved,
	getNewProblem,
	reset,
	initialState,
} from "./problemBoxesSlice";

describe("test decrementSeconds reducer", () => {
	it("decrements seconds by 1", () => {
		expect(store.getState().problemBoxes.seconds).toBe(120);
		store.dispatch(decrementSeconds());
		expect(store.getState().problemBoxes.seconds).toBe(119);
	});
});

describe("test incrementLevel reducer", () => {
	it("increments level for addtion problems", () => {
		expect(store.getState().problemBoxes.level.add).toBe(1);
		store.dispatch(incrementLevel("add"));
		expect(store.getState().problemBoxes.level.add).toBe(2);
	});

	it("increments level for subtraction problems", () => {
		expect(store.getState().problemBoxes.level.sub).toBe(1);
		store.dispatch(incrementLevel("sub"));
		expect(store.getState().problemBoxes.level.sub).toBe(2);
	});

	it("increments level for multiplication problems", () => {
		expect(store.getState().problemBoxes.level.mul).toBe(1);
		store.dispatch(incrementLevel("mul"));
		expect(store.getState().problemBoxes.level.mul).toBe(2);
	});

	it("increments level for division problems", () => {
		expect(store.getState().problemBoxes.level.div).toBe(1);
		store.dispatch(incrementLevel("div"));
		expect(store.getState().problemBoxes.level.div).toBe(2);
	});
});

describe("test incrementIncorrectGuesses", () => {
	expect(store.getState().problemBoxes.incorrectGuesses).toBe(0);
	store.dispatch(incrementIncorrectGuesses());
	expect(store.getState().problemBoxes.incorrectGuesses).toBe(1);
});

describe("test incrementSolved", () => {
	expect(store.getState().problemBoxes.solved).toBe(0);
	store.dispatch(incrementSolved());
	expect(store.getState().problemBoxes.solved).toBe(1);
});

describe("test getNewProblem", () => {
	it("will get a new addition problem", () => {
		const operation = "add";
		const firstProb = store.getState().problemBoxes.problems[operation];
		store.dispatch(getNewProblem(operation));
		const secondProb = store.getState().problemBoxes.problems[operation];
		expect(firstProb).not.toEqual(secondProb);
	});

	it("will get a new subtraction problem", () => {
		const operation = "sub";
		const firstProb = store.getState().problemBoxes.problems[operation];
		store.dispatch(getNewProblem(operation));
		const secondProb = store.getState().problemBoxes.problems[operation];
		expect(firstProb).not.toEqual(secondProb);
	});

	it("will get a new multiplication problem", () => {
		const operation = "mul";
		const firstProb = store.getState().problemBoxes.problems[operation];
		store.dispatch(getNewProblem(operation));
		const secondProb = store.getState().problemBoxes.problems[operation];
		expect(firstProb).not.toEqual(secondProb);
	});

	it("will get a new division problem", () => {
		const operation = "div";
		const firstProb = store.getState().problemBoxes.problems[operation];
		store.dispatch(getNewProblem(operation));
		const secondProb = store.getState().problemBoxes.problems[operation];
		expect(firstProb).not.toEqual(secondProb);
	});
});

describe("test reset reducer", () => {
	it("resets the state to initialState", () => {
		expect(store.getState().problemBoxes).toEqual({
			problems: {
				add: expect.any(Object),
				sub: expect.any(Object),
				mul: expect.any(Object),
				div: expect.any(Object),
			},
			level: { add: 2, sub: 2, mul: 2, div: 2 },
			seconds: 119,
			solved: 1,
			incorrectGuesses: 1,
		});
		store.dispatch(reset());
		expect(store.getState().problemBoxes).toEqual({
			problems: {
				add: expect.any(Object),
				sub: expect.any(Object),
				mul: expect.any(Object),
				div: expect.any(Object),
			},
			level: { add: 1, sub: 1, mul: 1, div: 1 },
			seconds: 120,
			solved: 0,
			incorrectGuesses: 0,
		});
	});
});
