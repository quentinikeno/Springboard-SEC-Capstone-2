import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { formatDate } from "../../helpers/formatDate";

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
			return resp.data; // {token, user}
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
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
			return resp.data; // {token, user}
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
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
			return { user: resp.data };
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
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
			return { user: resp.data };
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	}
);

export const deleteUser = createAsyncThunk(
	"user/deleteUser",
	async ({ username, token, data }, { rejectWithValue }) => {
		try {
			const resp = await axios.delete(`${apiURL}/user/${username}`, {
				headers: { Authorization: `Bearer ${token}` },
				data,
			});
			return resp.data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	}
);

const initialState = {
	id: null,
	token: null,
	username: null,
	joinAt: null,
	lastLoginAt: null,
	isAdmin: false,
	loading: false,
	error: null,
};

const reducers = {
	setCredentials: (state, action) => {
		const { token } = action.payload;
		state.token = token;
	},
	logOut: (state, action) => initialState,
	setUser: (state, action) => {
		const { id, username, joinAt, lastLoginAt, isAdmin } =
			action.payload.user;
		state.id = id;
		state.username = username;
		state.joinAt = formatDate(joinAt);
		state.lastLoginAt = formatDate(lastLoginAt);
		state.isAdmin = isAdmin;
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
				reducers.setUser(state, action);
				state.loading = false;
				state.error = null;
			})
			.addCase(registerUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				reducers.setCredentials(state, action);
				reducers.setUser(state, action);
				state.loading = false;
				state.error = null;
			})
			.addCase(loginUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				reducers.setUser(state, action);
				state.loading = false;
				state.error = null;
			})
			.addCase(getUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				reducers.setUser(state, action);
				if (action.payload.user.token) {
					reducers.setCredentials(state, {
						...action,
						payload: {
							token: action.payload.user.token,
						},
					});
				}
				state.loading = false;
				state.error = null;
			})
			.addCase(updateUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				reducers.logOut(state, action);
				state.loading = false;
				state.error = null;
			})
			.addCase(deleteUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});
	},
});

export const { setCredentials, logOut, setUser, setLoading } =
	userSlice.actions;

export default userSlice.reducer;

export const selectCurrentToken = (state) => state.user.token;
export const selectCurrentUser = (state) => state.user.username;
export const selectUserId = (state) => state.user.id;
