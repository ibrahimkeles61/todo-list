import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const SubmitButton = ({
	title,
	handleSubmit,
	submitFunction = () => {},
	customStyles,
}) => {
	const themes = useSelector((state) => state.userReducer.themes);
	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	return (
		<TouchableOpacity onPress={handleSubmit(submitFunction)}>
			<View
				style={{
					backgroundColor: themes[preferredTheme].primary,
					// width: 90,
					paddingHorizontal: 10,
					// height: 32,
					paddingVertical: 7,
					justifyContent: "center",
					alignItems: "center",
					borderRadius: 2,
					marginTop: 20,

					// shadowColor: themes.accent,
					shadowColor: "black",
					elevation: 3,
					...customStyles,
				}}
			>
				<Text
					style={{
						color: themes[preferredTheme].background,
						fontWeight: "bold",
					}}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default SubmitButton;
