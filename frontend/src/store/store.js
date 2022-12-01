import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux-slices/user/userSlice";
import problemBoxesReducer from "../redux-slices/math-squared/mathSquaredSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		problemBoxes: problemBoxesReducer,
	},
});
