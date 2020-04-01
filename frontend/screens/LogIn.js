//Login page

import React, { Component, useState } from "react";
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
import LoginOptions from "../components/LoginOptions";

const LogIn = props => {
	const [selectedOption, toggleBorderHandler] = useState([
		{
			type: "Student",
			border: "rgba(255,255,255,1)",
			selected: true,
			navigateTo: "Home"
		},
		{
			type: "Warden",
			border: "rgba(255,255,255,0)",
			selected: false,
			navigateTo: "Warden"
		},
		{
			type: "Caretaker",
			border: "rgba(255,255,255,0)",
			selected: false,
			navigateTo: "Caretaker"
		}
	]);

	const onClickHandler = index => {
		//to create a copy of the original array, so as not to change the original state.
		let newArr = [...selectedOption];
		//iterate over the array to find the one which was pressed and received in 'index' arguement.
		let identifiedPlace = newArr.find(p => p.type === index);

		for (let option of newArr) {
			option.border = "rgba(255,255,255,0)";
			option.selected = false;
		}
		identifiedPlace.border = "rgba(255,255,255,1)";
		identifiedPlace.selected = true;
		toggleBorderHandler(newArr);

		//navigate to the pressed option using navigaton prop received from navigation.js
		//props.navigation.navigate(identifiedPlace.type);
	};
	const navigateHandler = () => {
		for (let select of selectedOption) {
			if (select.selected) {
				props.navigation.navigate(select.navigateTo);
			}
		}
	};
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/images/logo.png")}
				resizeMode='contain'
				style={styles.logoImage}
			></Image>

			<View style={styles.innerContainer}>
				<View style={styles.selectOption}>
					{selectedOption.map(option => {
						return (
							<LoginOptions
								type={option.type}
								key={option.type}
								onClick={onClickHandler}
								border={option.border}
							/>
						);
					})}
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

				<Button
					buttonText='Log In'
					onClick={navigateHandler}
					color='rgba(95,0,14,1)'
					textColor='white'
				/>
			</View>
		</View>
	);
};

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
		marginTop: "10%"
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

export default LogIn;
