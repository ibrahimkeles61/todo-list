import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		loggedIn: true,
		themes: {
			dark: {
				text: "#f5f5f9",
				background: "#020203",
				primary: "#4844ab",
				secondary: "#22206A",
				accent: "#262092",
			},
			light: {
				text: "#06060a",
				background: "#fcfcfd",
				primary: "#5754bb",
				secondary: "#9795df",
				accent: "#726ddf",
			},
		},
		preferredTheme: "light",
	},
	reducers: {
		togglePreferredTheme: (state) => {
			state.preferredTheme === "light"
				? (state.preferredTheme = "dark")
				: (state.preferredTheme = "light");
		},

		toggleLoggedIn: (state) => {
			state.loggedIn = !state.loggedIn;
		},
	},
});

export default userSlice.reducer;
export const { togglePreferredTheme, toggleLoggedIn } = userSlice.actions;
