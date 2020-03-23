import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LogIn from "./screens/LogIn";
import Home from "./screens/Home";
import AppNavigator from "./components/Navigation";

export default function App() {
	return (
		<View style={styles.container}>
			<AppNavigator />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		justifyContent: "center"
	}
});
