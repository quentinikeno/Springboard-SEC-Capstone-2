import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMathProblem } from "../../helpers/genMathProblem";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getHighScore = createAsyncThunk(
	"mathSquared/getHighScore",
	async ({ gameId, token }, { rejectWithValue }) => {
		try {
			const resp = await axios.get(`${apiURL}/scores/games/${gameId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return resp.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
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
	highScore: null,
	error: null,
};

const reducers = {
	decrementSeconds: (state, action) => {
		state.seconds = state.seconds - 1;
	},
	incrementLevel: (state, action) => {
		state["level"][action.payload] = state["level"][action.payload] + 1;
	},
	incrementIncorrectGuesses: (state, action) => {
		state.incorrectGuesses = state.incorrectGuesses + 1;
	},
	incrementSolved: (state, action) => {
		state.solved = state.solved + 1;
	},
	getNewProblem: (state, action) => {
		state["problems"][action.payload] = getMathProblem(action.payload);
	},
	reset: (state, action) => initialState,
	updateHighScore: (state, action) => {
		state.highScore = action.payload.highScore;
	},
};

const mathSquaredSlice = createSlice({
	name: "mathSquared",
	initialState,
	reducers,
	extraReducers: (builder) => {
		builder
			.addCase(getHighScore.fulfilled, (state, action) => {
				reducers.updateHighScore(state, action);
				state.error = null;
			})
			.addCase(getHighScore.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});
export const {
	decrementSeconds,
	incrementLevel,
	incrementIncorrectGuesses,
	incrementSolved,
	getNewProblem,
	reset,
	updateHighScore,
} = mathSquaredSlice.actions;

export default mathSquaredSlice.reducer;
