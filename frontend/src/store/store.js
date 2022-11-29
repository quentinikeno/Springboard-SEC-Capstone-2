import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux-slices/user/userSlice";
import problemBoxesReducer from "../redux-slices/problemBoxes/problemBoxesSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		problemBoxes: problemBoxesReducer,
	},
});
