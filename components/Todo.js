import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import { toggleTodo } from "../redux/todosSlice";
import UpdateModal from "./UpdateModal";

const Todo = ({ todoId, todoMessage, todoCompleted }) => {
	const themes = useSelector((state) => state.userReducer.themes);
	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	const dispatch = useDispatch();

	const handleToggleTodo = () => dispatch(toggleTodo({ todoId }));

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
					todoId % 2 == 1
						? themes[preferredTheme].primary
						: themes[preferredTheme].secondary
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
						todoId % 2 == 1
							? themes[preferredTheme].primary
							: themes[preferredTheme].secondary,
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
