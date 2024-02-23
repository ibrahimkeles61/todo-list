import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector } from "react-redux";

import store from "./redux/store";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import TodosScreen from "./screens/TodosScreen";

const Stack = createNativeStackNavigator();

const LoggedInStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen
			name="TodosScreen"
			component={TodosScreen}
		/>
	</Stack.Navigator>
);

const LoggedOutStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen
			name="LoginScreen"
			component={LoginScreen}
		/>
		<Stack.Screen
			name="SignUpScreen"
			component={SignUpScreen}
		/>
	</Stack.Navigator>
);

function AppWithoutStore() {
	const loggedIn = useSelector((state) => state.userReducer.loggedIn);
	const themes = useSelector((state) => state.userReducer.themes);

	const preferredTheme = useSelector(
		(state) => state.userReducer.preferredTheme
	);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: `${themes[preferredTheme].background}77`,
			}}
		>
			<View
				style={{
					flex: 1,
					marginTop: StatusBar.currentHeight,
				}}
			>
				<NavigationContainer>
					{loggedIn ? <LoggedInStack /> : <LoggedOutStack />}
				</NavigationContainer>
			</View>
		</View>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<AppWithoutStore />
		</Provider>
	);
}
