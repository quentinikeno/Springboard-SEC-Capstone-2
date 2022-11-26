import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux-slices/user/userSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});
