import { store } from "../../store/store";
import {
	decrementSeconds,
	incrementLevel,
	incrementIncorrectGuesses,
	incrementSolved,
	getNewProblem,
	reset,
	updateHighScore,
} from "./mathSquaredSlice";

describe("test incrementLevel reducer", () => {
	it("increments level for addtion problems", () => {
		expect(store.getState().mathSquared.level.add).toBe(1);
		store.dispatch(incrementLevel("add"));
		expect(store.getState().mathSquared.level.add).toBe(2);
	});

	it("increments level for subtraction problems", () => {
		expect(store.getState().mathSquared.level.sub).toBe(1);
		store.dispatch(incrementLevel("sub"));
		expect(store.getState().mathSquared.level.sub).toBe(2);
	});

	it("increments level for multiplication problems", () => {
		expect(store.getState().mathSquared.level.mul).toBe(1);
		store.dispatch(incrementLevel("mul"));
		expect(store.getState().mathSquared.level.mul).toBe(2);
	});

	it("increments level for division problems", () => {
		expect(store.getState().mathSquared.level.div).toBe(1);
		store.dispatch(incrementLevel("div"));
		expect(store.getState().mathSquared.level.div).toBe(2);
	});
});

describe("test incrementIncorrectGuesses", () => {
	expect(store.getState().mathSquared.incorrectGuesses).toBe(0);
	store.dispatch(incrementIncorrectGuesses());
	expect(store.getState().mathSquared.incorrectGuesses).toBe(1);
});

describe("test incrementSolved", () => {
	expect(store.getState().mathSquared.solved).toBe(0);
	store.dispatch(incrementSolved());
	expect(store.getState().mathSquared.solved).toBe(1);
});

describe("test getNewProblem", () => {
	it("will get a new addition problem", () => {
		const operation = "add";
		const firstProb = store.getState().mathSquared.problems[operation];
		store.dispatch(getNewProblem(operation));
		const secondProb = store.getState().mathSquared.problems[operation];
		expect(firstProb).not.toEqual(secondProb);
	});

	it("will get a new subtraction problem", () => {
		const operation = "sub";
		const firstProb = store.getState().mathSquared.problems[operation];
		store.dispatch(getNewProblem(operation));
		const secondProb = store.getState().mathSquared.problems[operation];
		expect(firstProb).not.toEqual(secondProb);
	});

	it("will get a new multiplication problem", () => {
		const operation = "mul";
		const firstProb = store.getState().mathSquared.problems[operation];
		store.dispatch(getNewProblem(operation));
		const secondProb = store.getState().mathSquared.problems[operation];
		expect(firstProb).not.toEqual(secondProb);
	});

	it("will get a new division problem", () => {
		const operation = "div";
		const firstProb = store.getState().mathSquared.problems[operation];
		store.dispatch(getNewProblem(operation));
		const secondProb = store.getState().mathSquared.problems[operation];
		expect(firstProb).not.toEqual(secondProb);
	});
});

describe("test updateHighScore reducer", () => {
	it("update the highScore to 100", () => {
		expect(store.getState().mathSquared.highScore).toBe(null);
		store.dispatch(updateHighScore({ highScore: 100 }));
		expect(store.getState().mathSquared.highScore).toBe(100);
	});
});

describe("test reset reducer", () => {
	it("resets the state to initialState", () => {
		expect(store.getState().mathSquared).toEqual({
			problems: {
				add: expect.any(Object),
				sub: expect.any(Object),
				mul: expect.any(Object),
				div: expect.any(Object),
			},
			level: { add: 2, sub: 2, mul: 2, div: 2 },
			solved: 1,
			incorrectGuesses: 1,
			highScore: 100,
			loading: false,
			error: null,
		});
		store.dispatch(reset());
		expect(store.getState().mathSquared).toEqual({
			problems: {
				add: expect.any(Object),
				sub: expect.any(Object),
				mul: expect.any(Object),
				div: expect.any(Object),
			},
			level: { add: 1, sub: 1, mul: 1, div: 1 },
			solved: 0,
			incorrectGuesses: 0,
			highScore: 100,
			loading: false,
			error: null,
		});
	});
});
