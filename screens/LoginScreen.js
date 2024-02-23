import { Text, View, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { toggleLoggedIn } from "../redux/userSlice";
import CustomInput from "../components/CustomInput";
import SubmitButton from "../components/SubmitButton";

export default LoginScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const themes = useSelector((state) => state.userReducer.themes);
	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	const {
		control,
		handleSubmit,
		formState: { error },
	} = useForm();

	const EMAIL_REGEX =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const signIn = (data) => {
		dispatch(toggleLoggedIn());
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: themes[preferredTheme].background,
			}}
		>
			{/* EMAIL INPUT */}
			<CustomInput
				name="email"
				control={control}
				placeholder="Email"
				// rules={{
				// 	required: "Email Boş Bırakılamaz!",
				// 	pattern: {
				// 		value: EMAIL_REGEX,
				// 		message: "Bu email düzgün gözükmüyor.",
				// 	},
				// }}
			/>

			{/* PASSWORD INPUT */}
			<CustomInput
				name="password"
				control={control}
				placeholder="Şifre"
				// rules={{ required: "Şifre Boş Bırakılamaz!" }}
				customStyles={{
					marginTop: 10,
				}}
			/>

			{/* SUBMIT BUTTON */}
			<SubmitButton
				title="GİRİŞ YAP"
				handleSubmit={handleSubmit}
				submitFunction={signIn}
			/>

			{/* GO TO SIGNUP LINK */}
			<TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
				<Text
					style={{
						marginTop: 7,
						color: `${themes[preferredTheme].text}77`,
					}}
				>
					Hesabın Yok mu? Kayıt Ol
				</Text>
			</TouchableOpacity>
		</View>
	);
};
