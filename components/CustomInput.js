import { View, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";

const CustomInput = ({
	name,
	control,
	rules,
	placeholder,
	secureTextEntry,
	customStyles,
	errorStyles,
}) => {
	const themes = useSelector((state) => state.userReducer.themes);
	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	return (
		<Controller
			name={name}
			control={control}
			// rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<TextInput
						value={value}
						onChangeText={onChange}
						placeholder={placeholder}
						placeholderTextColor={
							error ? "#f007" : `${themes[preferredTheme].text}77`
						}
						secureTextEntry={secureTextEntry}
						style={{
							width: "60%",
							paddingVertical: 3,
							borderRadius: 10,
							borderWidth: 1,
							textAlign: "center",
							borderColor: error ? "red" : themes[preferredTheme].primary,
							color: error ? "red" : themes[preferredTheme].text,
							...customStyles,
						}}
					/>
					{error && (
						<Text
							style={{
								color: "red",
								...errorStyles,
							}}
						>
							{error.message || "Error"}
						</Text>
					)}
				</>
			)}
		/>
	);
};

export default CustomInput;
