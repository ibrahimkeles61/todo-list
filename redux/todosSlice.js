import { createSlice } from "@reduxjs/toolkit";
import { auth, db, doc, setDoc } from "../firebase";

const todosSlice = createSlice({
	name: "todos",
	initialState: {
		save_button_visibility_for_changes: false,
		todos: [
			// {
			// 	todoId: 1,
			// 	todoMessage: "gss borcunu öde",
			// 	todoCompleted: false,
			// },
			// {
			// 	todoId: 2,
			// 	todoMessage: "haftalık sporunu yap",
			// 	todoCompleted: true,
			// },
			// {
			// 	todoId: 3,
			// 	todoMessage: "gss borcunu öde",
			// 	todoCompleted: false,
			// },
			// {
			// 	todoId: 4,
			// 	todoMessage: "haftalık sporunu yap",
			// 	todoCompleted: true,
			// },
			// {
			// 	todoId: 5,
			// 	todoMessage: "gss borcunu öde",
			// 	todoCompleted: false,
			// },
			// {
			// 	todoId: 6,
			// 	todoMessage: "haftalık sporunu yap",
			// 	todoCompleted: true,
			// },
			// {
			// 	todoId: 7,
			// 	todoMessage: "gss borcunu öde",
			// 	todoCompleted: false,
			// },
			// {
			// 	todoId: 8,
			// 	todoMessage: "haftalık sporunu yap",
			// 	todoCompleted: true,
			// },
			// {
			// 	todoId: 9,
			// 	todoMessage: "gss borcunu öde",
			// 	todoCompleted: true,
			// },
			// {
			// 	todoId: 10,
			// 	todoMessage: "haftalık sporunu yap",
			// 	todoCompleted: false,
			// },
			// {
			// 	todoId: 11,
			// 	todoMessage: "gss borcunu öde",
			// 	todoCompleted: true,
			// },
			// {
			// 	todoId: 12,
			// 	todoMessage: "haftalık sporunu yap",
			// 	todoCompleted: false,
			// },
			// {
			// 	todoId: 13,
			// 	todoMessage: "gss borcunu öde",
			// 	todoCompleted: true,
			// },
			// {
			// 	todoId: 14,
			// 	todoMessage: "haftalık sporunu yap",
			// 	todoCompleted: false,
			// },
		],
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
