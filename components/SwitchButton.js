import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { togglePreferredTheme } from "../redux/userSlice";

const SwitchButton = ({ customStyles }) => {
	const themes = useSelector((state) => state.userReducer.themes);
	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	const dispatch = useDispatch();

	const handleTogglePreferredTheme = () => dispatch(togglePreferredTheme());

	return (
		<View
			style={{
				...customStyles,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TouchableOpacity onPress={handleTogglePreferredTheme}>
				{preferredTheme === "dark" ? (
					<MaterialCommunityIcons
						name="theme-light-dark"
						size={28}
						color={`${themes.light.background}`}
					/>
				) : (
					<MaterialCommunityIcons
						name="theme-light-dark"
						size={28}
						color={`${themes.dark.background}`}
					/>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default SwitchButton;
