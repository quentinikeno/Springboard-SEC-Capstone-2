import { store } from "../../store/store";
import { decrementSeconds, incrementLevel } from "./problemBoxesSlice";

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
