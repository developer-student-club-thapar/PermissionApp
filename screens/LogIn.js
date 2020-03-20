//Login page

import React, { Component } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image
} from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import Button from "../components/Button";

function Login(props) {
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/images/logo.png")}
				resizeMode='contain'
				style={styles.logoImage}
			></Image>

			<View style={styles.innerContainer}>
				<View style={styles.selectOption}>
					<TouchableOpacity style={styles.selectedbuttonLogin}>
						<Text style={styles.selectTextLogin}>Student</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.selectbuttonLogin}>
						<Text style={styles.selectTextLogin}>Warden</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.selectbuttonLogin}>
						<Text style={styles.selectTextLogin}>Caretaker</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.rect9}>
					<EvilIconsIcon name='user' style={styles.iconUser}></EvilIconsIcon>
					<TextInput
						placeholder='Username'
						placeholderTextColor='rgba(255,255,255,1)'
						secureTextEntry={false}
						style={styles.usernameInput}
					></TextInput>
				</View>
				<View style={styles.password}>
					<EvilIconsIcon
						name='lock'
						style={styles.iconPassword}
					></EvilIconsIcon>
					<TextInput
						placeholder='Password'
						placeholderTextColor='rgba(255,255,255,1)'
						secureTextEntry={false}
						style={styles.passwordInput}
					></TextInput>
				</View>
				<Button buttonText='Log In' />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		borderWidth: 1,
		backgroundColor: "rgba(18,18,18,1)",
		width: "100%"
	},
	logoImage: {
		width: 200,
		height: 200,
		alignItems: "center",
		marginTop: 20
	},

	selectOption: {
		width: "80%",
		flexDirection: "row",
		justifyContent: "space-around",
		shadowColor: "rgba(0,0,0,1)",
		shadowRadius: 0,
		marginBottom: 30
	},
	selectedbuttonLogin: {
		opacity: 1,
		borderRadius: 5,
		borderColor: "rgba(255,255,255,1)",
		borderWidth: 1
	},
	selectbuttonLogin: {
		opacity: 1
	},
	selectTextLogin: {
		color: "rgba(255,255,255,1)",
		alignSelf: "center",
		padding: 4
	},

	rect9: {
		height: 59,
		backgroundColor: "rgba(251,247,247,0.25)",
		opacity: 1,
		marginBottom: 20,
		borderRadius: 5,
		flexDirection: "row"
	},
	iconUser: {
		color: "rgba(255,255,255,1)",
		fontSize: 30,
		marginLeft: 20,
		alignSelf: "center"
	},
	usernameInput: {
		color: "rgba(255,255,255,1)"
	},
	password: {
		height: 59,
		backgroundColor: "rgba(253,251,251,0.25)",
		opacity: 1,
		borderRadius: 5,
		flexDirection: "row",
		marginBottom: 20
	},
	iconPassword: {
		color: "rgba(255,255,255,1)",
		fontSize: 33,
		marginLeft: 20,
		alignSelf: "center"
	},
	passwordInput: {
		color: "rgba(255,255,255,1)"
	},

	button: {
		height: 59,
		borderRadius: 11,
		borderColor: "rgba(252,252,252,1)",
		borderWidth: 1
	}
});

export default Login;
