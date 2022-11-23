import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux-slices/auth/authSlice";
import userReducer from "../redux-slices/user/userSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
	},
});
