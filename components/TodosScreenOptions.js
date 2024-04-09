import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { AntDesign } from "@expo/vector-icons";

const TodosScreenOptions = ({
	themes,
	options_modal_visibility,
	handle_todos_screen_options_visibility,
	handleLogOut,
	handle_delete_account,
}) => {
	return (
		<Modal
			isVisible={options_modal_visibility}
			animationIn={"slideInRight"}
			animationOut={"slideOutRight"}
			style={{
				backgroundColor: themes.background,
				// backgroundColor: "yellow",
				width: "60%",
				height: "95%",
				position: "absolute",
				right: 0,
			}}
		>
			{/* HEADER */}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
					height: "7%",
				}}
			>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 20,
					}}
				>
					SEÇENEKLER
				</Text>

				<TouchableOpacity onPress={handle_todos_screen_options_visibility}>
					<AntDesign
						name="closecircleo"
						size={24}
						color={themes.background}
					/>
				</TouchableOpacity>
			</View>

			{/* BODY - OPTIONS */}
			<View
				style={{
					height: "93%",
					position: "relative",
				}}
			>
				<View
					style={{
						position: "absolute",
						width: "100%",
						height: 50,
						bottom: 0,
						flexDirection: "row",
					}}
				>
					<TouchableOpacity
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#ff000022",
						}}
						onPress={handle_delete_account}
					>
						<Text
							style={{
								fontSize: 18,
							}}
						>
							Hesabı Sil
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "red",
						}}
						onPress={handleLogOut}
					>
						<Text
							style={{
								fontSize: 18,
							}}
						>
							Çıkış Yap
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};
export default TodosScreenOptions;
