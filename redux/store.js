import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import userReducer from "./userSlice";

const store = configureStore({
	reducer: {
		todosReducer,
		userReducer,
	},
});

export default store;
