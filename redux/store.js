import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import userReducer from "./userSlice";

const store = configureStore({
	reducer: {
		todosReducer,
		userReducer,
	},
	// middleware: () =>
	// 	getDefaultMiddleware({
	// 		serializableCheck: false,
	// 	}),
});

export default store;

// import { configureStore } from '@reduxjs/toolkit'

// import rootReducer from './reducer'

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// })
