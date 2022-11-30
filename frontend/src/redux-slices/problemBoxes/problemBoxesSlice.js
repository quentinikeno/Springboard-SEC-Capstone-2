import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMathProblem } from "../../helpers/genMathProblem";

const problemBoxesSlice = createSlice({
	name: "problemBoxes",
	initialState: {
		problems: {
			add: getMathProblem("add"),
			sub: getMathProblem("sub"),
			mul: getMathProblem("mul"),
			div: getMathProblem("div"),
		},
		level: { add: 1, sub: 1, mul: 1, div: 1 },
		seconds: 120,
		solved: 0,
		incorrectGuesses: 0,
		loading: false,
	},
	reducers: {
		decrementSeconds: (state, action) => {
			state.seconds = state.seconds - 1;
		},
		incrementLevel: (state, action) => {
			state["level"][action.payload] = state["level"][action.payload] + 1;
		},
	},
});
export const { decrementSeconds, incrementLevel } = problemBoxesSlice.actions;

export default problemBoxesSlice.reducer;
