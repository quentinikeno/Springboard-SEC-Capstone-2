import { store } from "../../store/store";
import { decrementSeconds } from "./problemBoxesSlice";

describe("test decrementSeconds reducer", () => {
	it("decrements seconds by 1", () => {
		expect(store.getState().problemBoxes.seconds).toBe(120);
		store.dispatch(decrementSeconds());
		expect(store.getState().problemBoxes.seconds).toBe(119);
	});
});
