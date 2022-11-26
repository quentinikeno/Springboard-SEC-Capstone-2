import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const registerUser = createAsyncThunk(
	"user/registerUser",
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
	"user/loginUser",
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

export const getUser = createAsyncThunk(
	"user/getUser",
	async ({ username, token }, { rejectWithValue }) => {
		try {
			const resp = await axios.get(`${apiURL}/user/${username}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return resp.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateUser = createAsyncThunk(
	"user/updateUser",
	async ({ username, token, data }, { rejectWithValue }) => {
		try {
			const resp = await axios.patch(`${apiURL}/user/${username}`, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return resp.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const formatDate = (dateString) => {
	const options = { year: "numeric", month: "long", day: "numeric" };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const initialState = {
	id: null,
	token: null,
	username: null,
	joinAt: null,
	lastLoginAt: null,
	loading: false,
	error: null,
};

const reducers = {
	setCredentials: (state, action) => {
		const { token, username } = action.payload;
		state.token = token;
		state.username = username;
	},
	logOut: (state, action) => initialState,
	setUser: (state, action) => {
		const { id, joinAt, lastLoginAt } = action.payload;
		state.id = id;
		state.joinAt = formatDate(joinAt);
		state.lastLoginAt = formatDate(lastLoginAt);
	},
	setLoading: (state, action) => {
		state.loading = action.payload;
	},
};

const userSlice = createSlice({
	name: "user",
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
			})
			.addCase(getUser.fulfilled, (state, action) => {
				reducers.setUser(state, action);
				state.loading = false;
				state.error = null;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				reducers.updateUser(state, action);
				state.loading = false;
				state.error = null;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const { setCredentials, logOut, setUser, setLoading } =
	userSlice.actions;

export default userSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.username;
export const selectUserId = (state) => state.user.id;
