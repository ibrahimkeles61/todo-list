import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import {
	toggleTodo,
	change_save_button_visibility_for_changes,
} from "../redux/todosSlice";
import UpdateModal from "./UpdateModal";

const Todo = ({ todoId, todoMessage, todoCompleted, todoIndex }) => {
	const dispatch = useDispatch();

	const themes = useSelector((state) => state.userReducer.themes);
	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	// veritabanindaki deger hep bi onceki degisikligi tutuyo oluyo, statete falsesa db de true oluyo bu yuzden, o yuzden bu isi ya burdaki cirkin yontemle yapicam yada su an yaptigin diger cirkin yontemle:

	// const handleToggleTodo = async () => {
	// 	const todosSnap = await getDoc(doc(db, "users", auth.currentUser?.email));

	// 	if (todosSnap.exists()) {
	// 		const todos = todosSnap.data().todos;

	// 		const theTodoHasToChange = todos.find((todo) => todo.todoId === todoId);

	// 		theTodoHasToChange.todoCompleted = !theTodoHasToChange.todoCompleted;

	// 		const newTodos = todos.filter((todo) => todo.todoId !== todoId);

	// 		newTodos.push(theTodoHasToChange);

	// 		await setDoc(doc(db, "users", auth.currentUser.email), {
	// 			todos: newTodos,
	// 		});

	// 		dispatch(toggleTodo({ todoId }));
	// 	}
	// };

	const handleToggleTodo = () => {
		dispatch(toggleTodo({ todoId }));
		dispatch(change_save_button_visibility_for_changes(true));
	};

	const [updateMode, setUpdateMode] = useState(false);

	const handleUpdateModalVisibility = () => {
		setUpdateMode(!updateMode);
	};

	if (updateMode) {
		return (
			<UpdateModal
				handleUpdateModalVisibility={handleUpdateModalVisibility}
				// customStyles={{
				// 	backgroundColor:
				// 		todoId % 2 == 1
				// 			? themes[preferredTheme].primary
				// 			: themes[preferredTheme].secondary,
				// }}
				backgroundColor={
					todoIndex % 2 == 1
						? themes[preferredTheme].secondary
						: themes[preferredTheme].primary
				}
				themes={themes[preferredTheme]}
				todoMessage={todoMessage}
				todoId={todoId}
			/>
		);
	}

	return (
		<View
			style={{
				flexDirection: "row",
				marginTop: 10,
				justifyContent: "space-around",
				height: 50,
			}}
		>
			<TouchableOpacity
				onPress={handleUpdateModalVisibility}
				style={{
					width: "80%",
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor:
						todoIndex % 2 == 1
							? themes[preferredTheme].secondary
							: themes[preferredTheme].primary,
					borderRadius: 10,
				}}
			>
				<Text
					style={{
						color: todoCompleted
							? `${themes[preferredTheme].text}77`
							: themes[preferredTheme].text,
						fontSize: 16,
						textDecorationLine: todoCompleted ? "line-through" : "none",
					}}
				>
					{todoMessage.toUpperCase()}
				</Text>
			</TouchableOpacity>

			<View
				style={{
					width: "15%",
					height: "100%",
					backgroundColor: themes.light.background,
					borderRadius: 10,
					borderWidth: 2,
					borderColor: themes.dark.background,
					paddingTop: 10,
					paddingLeft: 10,
				}}
			>
				<TouchableOpacity
					style={{
						flex: 1,
					}}
					onPress={handleToggleTodo}
				>
					{todoCompleted && (
						<AntDesign
							name="check"
							size={30}
							color="black"
						/>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Todo;
