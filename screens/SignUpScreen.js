import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import CustomInput from "../components/CustomInput";
import SubmitButton from "../components/SubmitButton";

import {
	auth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	setDoc,
	doc,
	db,
} from "../firebase";

const SignUpScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const themes = useSelector((state) => state.userReducer.themes);
	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const EMAIL_REGEX =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const signUp = async ({ email, password }) => {
		await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
			console.log(err.message)
		);

		await sendEmailVerification(auth.currentUser);

		const date = new Date();

		await setDoc(doc(db, "users", auth.currentUser.uid), {
			accountEmail: auth.currentUser.email,
			accountCreated: `${date.getDate()}-${
				date.getMonth() + 1
			}-${date.getFullYear()}`,
			todos: [],
		});

		Alert.alert(
			"Email Doğrulama",
			'Emailinize "noreply@todo-list-97737.firebaseapp.com" tarafından bir doğrulama linki gönderdik. Büyük ihtimalle spam klasörünüze düşmüş olabilir. Hesabınızı onaylamak için linke tıklayın. Aynı gün içerisinde onaylanmamış hesaplar silinir.',
			[{ text: "OK", onPress: () => console.log("OK Pressed") }]
		);
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
				placeholder="Emailinizi Giriniz"
				rules={{
					required: "Email Boş Bırakılamaz!",
					pattern: {
						value: EMAIL_REGEX,
						message: "Bu email düzgün gözükmüyor.",
					},
				}}
				customStyles={{
					marginTop: 10,
				}}
			/>

			{/* EMAIL REPEAT INPUT */}
			<CustomInput
				name="email_repeat"
				control={control}
				placeholder="Emailinizi Tekrarlayınız"
				rules={{
					required: "Email Boş Bırakılamaz!",
					pattern: {
						value: EMAIL_REGEX,
						message: "Bu email düzgün gözükmüyor.",
					},
					validate: (value) =>
						value === watch("email") || "İki Email Birbiriyle Eşleşmiyor",
				}}
				customStyles={{
					marginTop: 10,
				}}
			/>

			{/* PASSWORD INPUT */}
			<CustomInput
				name="password"
				control={control}
				placeholder="Şifrenizi Giriniz"
				secureTextEntry
				rules={{
					required: "Şifre Boş Bırakılamaz!",
					minLength: {
						value: 6,
						message: "Şifre En Az 6 Haneli Olmalıdır",
					},
				}}
				customStyles={{
					marginTop: 10,
				}}
			/>

			{/* PASSWORD REPEAT INPUT */}
			<CustomInput
				name="password_repeat"
				control={control}
				placeholder="Şifrenizi Tekrarlayınız"
				secureTextEntry
				rules={{
					required: "Şifre Boş Bırakılamaz!",
					validate: (value) =>
						value === watch("password") || "İki Şifre Birbiriyle Eşleşmiyor",
				}}
				customStyles={{
					marginTop: 10,
				}}
			/>

			<SubmitButton
				handleSubmit={handleSubmit}
				submitFunction={signUp}
				title="KAYDOL"
			/>

			{/* GO TO LOGIN LINK */}
			<TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
				<Text
					style={{
						marginTop: 7,
						color: `${themes[preferredTheme].text}77`,
					}}
				>
					Zaten Hesabınız Var mı? Giriş Yapın
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SignUpScreen;
