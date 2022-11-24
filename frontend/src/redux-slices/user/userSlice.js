import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

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

const formatDate = (dateString) => {
	const options = { year: "numeric", month: "long", day: "numeric" };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const reducers = {
	setUser: (state, action) => {
		const { id, joinAt, lastLoginAt } = action.payload;
		state.id = id;
		state.joinAt = formatDate(joinAt);
		state.lastLoginAt = formatDate(lastLoginAt);
	},
	removeUserOnLogOut: (state, action) => {
		state.id = null;
		state.joinAt = null;
		state.lastLoginAt = null;
	},
	setLoading: (state, action) => {
		state.loading = action.payload;
	},
};

const userSlice = createSlice({
	name: "user",
	initialState: {
		id: null,
		joinAt: null,
		lastLoginAt: null,
		loading: false,
		error: null,
	},
	reducers,
	extraReducers: (builder) => {
		builder
			.addCase(getUser.fulfilled, (state, action) => {
				reducers.setUser(state, action);
				state.loading = false;
				state.error = null;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const { setUser, removeUserOnLogOut, setLoading } = userSlice.actions;

export default userSlice.reducer;

export const selectUserId = (state) => state.user.id;
