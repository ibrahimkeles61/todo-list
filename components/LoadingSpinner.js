import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

import { auth, signOut } from "../firebase";

const LoadingSpinner = () => {
	const handleLogOut = async () => {
		signOut(auth).catch((err) => console.log(err.message));
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "white",
			}}
		>
			<ActivityIndicator
				size="large"
				color="red"
			/>

			<TouchableOpacity
				onPress={handleLogOut}
				style={{
					marginTop: 40,
				}}
			>
				<Text
					style={{
						fontWeight: "bold",
					}}
				>
					İptal
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default LoadingSpinner;
