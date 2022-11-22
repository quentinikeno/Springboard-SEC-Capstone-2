import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiAuthURL =
	`${process.env.REACT_APP_API_URL}/auth` || "http://localhost:3000/auth";

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async ({ username, email, password }, { rejectWithValue }) => {
		try {
			const resp = await axios.post(`${apiAuthURL}`, {
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

const authSlice = createSlice({
	name: "auth",
	initialState: { token: null, error: null },
	reducers: {
		setCredentials: (state, action) => {
			const { token } = action.payload;
			state.token = token;
		},
		logOut: (state, action) => {
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				this.reducers.setCredentials(state, action);
			})
			.addCase(registerUser.rejected, (state, action) => {
				this.state.error = action.payload;
			});
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
