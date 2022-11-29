import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux-slices/user/userSlice";
import problemBoxesReducer from "../redux-slices/problemBoxes";

export const store = configureStore({
	reducer: {
		user: userReducer,
		problemBoxes: problemBoxesReducer,
	},
});
