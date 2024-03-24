import { View, Text, TouchableOpacity, Keyboard, Animated } from "react-native";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { addTodo } from "../redux/todosSlice";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";

import { auth, db, doc, setDoc } from "../firebase";

const AddModal = ({ modalVisible, themes, handleAddModalVisibility }) => {
	const dispatch = useDispatch();

	const preTodos = useSelector((state) => state.todosReducer.todos);

	const {
		control,
		handleSubmit,
		formState: { error },
	} = useForm();

	const saveTodo = async (data) => {
		const newTodo = {
			todoMessage: data.todo_message,
			todoCompleted: false,
			todoId: preTodos[preTodos.length - 1].todoId + 1,
		};

		dispatch(addTodo(newTodo));

		await setDoc(doc(db, "users", auth.currentUser.uid), {
			todos: [...preTodos, newTodo],
		});
	};

	// const [keyboardShown, setKeyboardShown] = useState(false);
	// const [keyboardHeight, setKeyboardHeight] = useState(0);

	// useEffect(() => {
	// 	const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
	// 		setKeyboardShown(true);
	// 		// setKeyboardHeight(Keyboard.metrics().height);
	// 	});
	// 	const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
	// 		setKeyboardShown(false);
	// 		// setKeyboardHeight(0);
	// 	});

	// 	return () => {
	// 		showSubscription.remove();
	// 		hideSubscription.remove();
	// 	};
	// }, []);

	// const slideAnim = useRef(new Animated.Value(300)).current;

	// const slideAnimation = () =>
	// 	modalVisible
	// 		? Animated.timing(slideAnim, {
	// 				toValue: 0,
	// 				duretion: 100,
	// 				useNativeDriver: true,
	// 		  }).start()
	// 		: Animated.timing(slideAnim, {
	// 				toValue: 300,
	// 				duretion: 100,
	// 				useNativeDriver: true,
	// 		  }).start();

	return (
		<View
			style={{
				backgroundColor: `${themes.background}ee`,
				width: "100%",
				height: 300,
				zIndex: 2,
				position: "absolute",
				bottom: modalVisible ? 0 : -300,
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
					<TouchableOpacity onPress={() => handleAddModalVisibility()}>
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
					EKLE
				</Text>

				<View
					style={{
						flex: 1,
					}}
				></View>
			</View>
			{/* END OF HEADER */}

			{/* FORM SECTION */}
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
					}}
				/>
				<SubmitButton
					title="KAYDET"
					handleSubmit={handleSubmit}
					submitFunction={saveTodo}
				/>
			</View>
		</View>
	);
};

export default AddModal;
