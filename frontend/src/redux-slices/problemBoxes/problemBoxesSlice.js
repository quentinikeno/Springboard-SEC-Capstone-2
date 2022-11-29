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
		timerSeconds: 120,
		solved: 0,
		incorrectGuesses: 0,
		loading: false,
	},
	reducers: {},
});

export default problemBoxesSlice.reducer;
