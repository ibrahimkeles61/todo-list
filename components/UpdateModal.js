import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
	removeTodo,
	updateTodo,
	change_save_button_visibility_for_changes,
} from "../redux/todosSlice";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";

const UpdateModal = ({
	backgroundColor,
	themes,
	handleUpdateModalVisibility,
	todoMessage,
	todoId,
}) => {
	const dispatch = useDispatch();

	const {
		control,
		handleSubmit,
		formState: { error },
	} = useForm({
		defaultValues: {
			todo_message: todoMessage,
		},
	});

	const saveTodo = (data) => {
		dispatch(updateTodo({ todoId, todoMessage: data.todo_message }));
		handleUpdateModalVisibility();
		dispatch(change_save_button_visibility_for_changes(true));
	};

	const deleteTodo = () => {
		dispatch(removeTodo({ todoId }));
		handleUpdateModalVisibility();
		dispatch(change_save_button_visibility_for_changes(true));
	};

	return (
		<View
			style={{
				marginTop: 10,
				height: 300,
				borderRadius: 10,
				backgroundColor: backgroundColor,
			}}
		>
			{/* HEADER */}
			<View
				style={{
					flexDirection: "row",
					width: "100%",
					marginTop: 20,
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<TouchableOpacity onPress={handleUpdateModalVisibility}>
						<Ionicons
							name="arrow-back-circle-outline"
							size={34}
							color={themes.text}
						/>
					</TouchableOpacity>
				</View>

				<Text
					style={{
						flex: 1.2,
						fontSize: 28,
						fontWeight: "bold",
						color: themes.text,
						textAlign: "center",
						textAlignVertical: "center",
					}}
				>
					GÜNCELLE
				</Text>

				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<TouchableOpacity onPress={deleteTodo}>
						<View
							style={{
								width: 90,
								height: 35,
								borderRadius: 50,
								backgroundColor: "red",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text
								style={{
									color: themes.text,
									color: "white",
								}}
							>
								KAYDI SİL
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			{/* END OF HEADER */}

			<View
				style={{
					width: "100%",
					height: "50%",
					alignItems: "center",
					justifyContent: "center",
					marginTop: 35,
				}}
			>
				<CustomInput
					name="todo_message"
					control={control}
					placeholder="Görev Girin.."
					customStyles={{
						width: "80%",
						height: 50,
						borderColor: themes.text,
					}}
				/>
				<SubmitButton
					title="KAYDET"
					handleSubmit={handleSubmit}
					submitFunction={saveTodo}
					customStyles={{
						backgroundColor: themes.text,
					}}
				/>
			</View>
		</View>
	);
};

export default UpdateModal;
