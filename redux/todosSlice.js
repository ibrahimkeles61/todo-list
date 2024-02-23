import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
	name: "todos",
	initialState: {
		todos: [
			{
				todoId: 1,
				todoMessage: "gss borcunu öde",
				todoCompleted: false,
			},
			{
				todoId: 2,
				todoMessage: "haftalık sporunu yap",
				todoCompleted: true,
			},
			{
				todoId: 3,
				todoMessage: "gss borcunu öde",
				todoCompleted: false,
			},
			{
				todoId: 4,
				todoMessage: "haftalık sporunu yap",
				todoCompleted: true,
			},
			{
				todoId: 5,
				todoMessage: "gss borcunu öde",
				todoCompleted: false,
			},
			{
				todoId: 6,
				todoMessage: "haftalık sporunu yap",
				todoCompleted: true,
			},
			{
				todoId: 7,
				todoMessage: "gss borcunu öde",
				todoCompleted: false,
			},
			{
				todoId: 8,
				todoMessage: "haftalık sporunu yap",
				todoCompleted: true,
			},
			{
				todoId: 9,
				todoMessage: "gss borcunu öde",
				todoCompleted: true,
			},
			{
				todoId: 10,
				todoMessage: "haftalık sporunu yap",
				todoCompleted: false,
			},
			{
				todoId: 11,
				todoMessage: "gss borcunu öde",
				todoCompleted: true,
			},
			{
				todoId: 12,
				todoMessage: "haftalık sporunu yap",
				todoCompleted: false,
			},
			{
				todoId: 13,
				todoMessage: "gss borcunu öde",
				todoCompleted: true,
			},
			{
				todoId: 14,
				todoMessage: "haftalık sporunu yap",
				todoCompleted: false,
			},
		],
	},
	reducers: {
		addTodo: (state, { payload }) => {
			const newId = state.todos.length + 1;
			state.todos.push({
				todoId: newId,
				todoMessage: payload,
				todoCompleted: false,
			});
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

		toggleTodo: (state, { payload }) => {
			const todo = state.todos.find((todo) => todo.todoId === payload.todoId);
			todo.todoCompleted = !todo.todoCompleted;
		},
	},
});

export default todosSlice.reducer;
export const { addTodo, toggleTodo, removeTodo, updateTodo } =
	todosSlice.actions;
