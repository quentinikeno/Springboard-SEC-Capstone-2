import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async ({ username, email, password }, { rejectWithValue }) => {
		try {
			const resp = await axios.post(`${apiURL}/auth/register`, {
				username,
				email,
				password,
			});
			return resp.data; // {token}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const resp = await axios.post(`${apiURL}/auth/login`, {
				username,
				password,
			});
			return resp.data; // {token}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = { token: null, username: null, error: null };

const reducers = {
	setCredentials: (state, action) => {
		const { token, username } = action.payload;
		state.token = token;
		state.username = username;
	},
	logOut: (state, action) => initialState,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers,
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				reducers.setCredentials(state, action);
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				reducers.setCredentials(state, action);
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.username;
