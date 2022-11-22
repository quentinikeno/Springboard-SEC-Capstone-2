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

const reducers = {
	setCredentials: (state, action) => {
		const { token } = action.payload;
		state.token = token;
	},
	logOut: (state, action) => {
		state.token = null;
	},
};

const authSlice = createSlice({
	name: "auth",
	initialState: { token: null, error: null },
	reducers,
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				reducers.setCredentials(state, action);
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				reducers.setCredentials(state, action);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
