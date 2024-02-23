import { View, Text, FlatList, TouchableOpacity, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useState, useRef } from "react";

import { toggleLoggedIn } from "../redux/userSlice";
import SwitchButton from "../components/SwitchButton";
import Todo from "../components/Todo";
import AddModal from "../components/AddModal";

const TodosScreen = () => {
	const dispatch = useDispatch();

	const [addModalVisibility, setAddModalVisibility] = useState(false);

	const todos = useSelector((state) => state.todosReducer.todos);
	const themes = useSelector((state) => state.userReducer.themes);
	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	const fadeAnim = useRef(new Animated.Value(0)).current;

	const fadeAnimation = () =>
		addModalVisibility
			? Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 100,
					useNativeDriver: true,
			  }).start()
			: Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 100,
					useNativeDriver: true,
			  }).start();

	const handleAddModalVisibility = () => (
		fadeAnimation(), setAddModalVisibility(!addModalVisibility)
	);

	const handleLogOut = () => dispatch(toggleLoggedIn());

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: themes[preferredTheme].background,
				position: "relative",
			}}
		>
			{/* ACTUAL SCREEN */}
			<Animated.View
				style={{
					backgroundColor: "#000c",
					backgroundColor: `${themes[preferredTheme].background}aa`,
					width: "100%",
					height: "100%",
					position: "absolute",
					top: 0,
					zIndex: fadeAnim,
					opacity: fadeAnim,
				}}
			/>

			{/* HEADER */}
			<View
				style={{
					width: "100%",
					flexDirection: "row",
					marginTop: 15,
				}}
			>
				<SwitchButton
					customStyles={{
						flex: 1,
					}}
				/>
				<Text
					style={{
						flex: 3,
						fontSize: 28,
						fontWeight: "bold",
						color: themes[preferredTheme].text,
						textAlign: "center",
						textAlignVertical: "center",
					}}
				>
					YAPILACAKLAR
				</Text>

				<View
					style={{
						flex: 1.4,
						justifyContent: "space-around",
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					<TouchableOpacity onPress={handleAddModalVisibility}>
						<Ionicons
							name="add-circle-outline"
							size={30}
							color={themes[preferredTheme].text}
						/>
					</TouchableOpacity>

					<TouchableOpacity onPress={handleLogOut}>
						<AntDesign
							name="logout"
							size={24}
							color={themes[preferredTheme].text}
						/>
					</TouchableOpacity>
				</View>
			</View>
			{/* HEADER */}

			<FlatList
				data={todos}
				renderItem={({ item }) => (
					<Todo
						todoId={item.todoId}
						todoMessage={item.todoMessage}
						todoCompleted={item.todoCompleted}
					/>
				)}
				keyExtractor={(item) => item.todoId}
				style={{
					width: "100%",
					marginTop: 10,
				}}
			/>
			{/* ACTUAL SCREEN */}

			<AddModal
				modalVisible={addModalVisibility}
				themes={themes[preferredTheme]}
				handleAddModalVisibility={handleAddModalVisibility}
			/>
		</View>
	);
};

export default TodosScreen;
