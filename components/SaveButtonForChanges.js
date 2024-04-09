import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { change_save_button_visibility_for_changes } from "../redux/todosSlice";

import { auth, db, doc, setDoc } from "../firebase";

const SaveButtonForChanges = () => {
	const dispatch = useDispatch();

	const save_button_visibility_for_changes = useSelector(
		(state) => state.todosReducer.save_button_visibility_for_changes
	);
	const themes = useSelector((state) => state.userReducer.themes);
	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	const todos = useSelector((state) => state.todosReducer.todos);

	const account_credentials_on_firebase = useSelector(
		(state) => state.userReducer.accountCredentialsOnFirebase
	);

	const handle_save = async () => {
		dispatch(change_save_button_visibility_for_changes(false));
		await setDoc(doc(db, "users", auth.currentUser.uid), {
			accountEmail: account_credentials_on_firebase.accountEmailOnFirebase,
			accountCreated: account_credentials_on_firebase.accountCreatedOnFirebase,
			todos: todos,
		});
	};

	return (
		<View
			style={
				save_button_visibility_for_changes
					? {
							width: 200,
							height: 40,
							backgroundColor: themes[preferredTheme].primary,
							justifyContent: "center",
							alignItems: "center",
							borderRadius: 20,
							marginVertical: 10,
					  }
					: {
							width: 0,
							height: 0,
					  }
			}
		>
			<TouchableOpacity onPress={handle_save}>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "400",
					}}
				>
					Değişiklikleri Kaydet
				</Text>
			</TouchableOpacity>
		</View>
	);
};
export default SaveButtonForChanges;
