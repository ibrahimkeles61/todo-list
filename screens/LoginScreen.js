import { Text, View, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import CustomInput from "../components/CustomInput";
import SubmitButton from "../components/SubmitButton";

import { auth, signInWithEmailAndPassword } from "../firebase";

export default LoginScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const themes = useSelector((state) => state.userReducer.themes);
	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	const [show_password_wrong, set_show_password_wrong] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { error },
	} = useForm();

	const EMAIL_REGEX =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const signIn = async ({ email, password }) => {
		signInWithEmailAndPassword(auth, email, password).catch((err) => {
			console.log(err.message);

			if (err.message == "Firebase: Error (auth/invalid-credential).") {
				set_show_password_wrong(true);
			}
		});
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
				secureTextEntry
				// rules={{ required: "Şifre Boş Bırakılamaz!" }}
				customStyles={{
					marginTop: 10,
				}}
			/>

			{show_password_wrong && (
				<Text
					style={{
						marginTop: 10,
						color: "red",
					}}
				>
					Şifre veya Email Yanlış
				</Text>
			)}

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
