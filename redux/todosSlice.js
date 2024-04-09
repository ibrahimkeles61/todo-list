import { createSlice } from "@reduxjs/toolkit";
import { auth, db, doc, setDoc } from "../firebase";

const todosSlice = createSlice({
	name: "todos",
	initialState: {
		save_button_visibility_for_changes: false,
		todos: [],
	},
	reducers: {
		setTodos: (state, { payload }) => {
			state.todos = payload;
		},

		addTodo: (state, { payload }) => {
			state.todos.push(payload);
		},

		removeTodo: (state, { payload }) => {
			const newTodos = state.todos.filter(
				(todo) => todo.todoId !== payload.todoId
			);

			state.todos = newTodos;
		},

		updateTodo: (state, { payload }) => {
			const whichTodo = state.todos.find(
				(todo) => todo.todoId === payload.todoId
			);

			whichTodo.todoMessage = payload.todoMessage;
		},

		// toggleTodo: async (state, { payload }) => {
		// 	const todo = state.todos.find((todo) => todo.todoId === payload.todoId);
		// 	todo.todoCompleted = !todo.todoCompleted;
		// },

		toggleTodo: (state, { payload }) => {
			const todo = state.todos.find((todo) => todo.todoId === payload.todoId);
			todo.todoCompleted = !todo.todoCompleted;
		},

		change_save_button_visibility_for_changes: (state, { payload }) => {
			state.save_button_visibility_for_changes = payload;
		},

		clearTodos: (state) => {
			state.todos = [];
		},
	},
});

export default todosSlice.reducer;
export const {
	setTodos,
	addTodo,
	toggleTodo,
	removeTodo,
	updateTodo,
	change_save_button_visibility_for_changes,
	clearTodos,
} = todosSlice.actions;
