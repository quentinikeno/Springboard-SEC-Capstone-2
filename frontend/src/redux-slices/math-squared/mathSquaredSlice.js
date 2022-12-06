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
			return rejectWithValue(error.response.data.error.message);
		}
	}
);

export const postHighScore = createAsyncThunk(
	"mathSquared/postHighScore",
	async ({ gameId, highScore, token }, { rejectWithValue }) => {
		try {
			const resp = await axios.post(
				`${apiURL}/scores`,
				{ gameId, highScore },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return resp.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	}
);

export const patchHighScore = createAsyncThunk(
	"mathSquared/patchHighScore",
	async ({ gameId, highScore, token }, { rejectWithValue }) => {
		try {
			const resp = await axios.patch(
				`${apiURL}/scores`,
				{ gameId, highScore },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return resp.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
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
	solved: 0,
	incorrectGuesses: 0,
	highScore: null,
	loading: false,
	error: null,
};

const reducers = {
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
	reset: (state, action) => ({
		...initialState,
		highScore: state.highScore,
		problems: {
			add: getMathProblem("add"),
			sub: getMathProblem("sub"),
			mul: getMathProblem("mul"),
			div: getMathProblem("div"),
		},
	}),
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
				state.loading = false;
				state.error = null;
			})
			.addCase(getHighScore.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getHighScore.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(postHighScore.fulfilled, (state, action) => {
				reducers.updateHighScore(state, action);
				state.loading = false;
				state.error = null;
			})
			.addCase(postHighScore.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(postHighScore.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(patchHighScore.fulfilled, (state, action) => {
				reducers.updateHighScore(state, action);
				state.loading = false;
				state.error = null;
			})
			.addCase(patchHighScore.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(patchHighScore.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
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
