// Home page is the select category page of our app.
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image
} from "react-native";
import ButtonFilled from "../components/ButtonFilled";
import AppHeader from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";

const Home = props => {
	const [selectedOption, toggleColorHandler] = useState([
		{ type: "Library", color: "rgba(95,0,14,1)" },
		{ type: "LateEntry", color: "rgba(95,0,14,1)" },
		{ type: "EarlyLeave", color: "rgba(95,0,14,1)" },
		{ type: "Society", color: "rgba(95,0,14,1)" }
	]);

	const onClickHandler = index => {
		let newArr = [...selectedOption];
		let identifiedPlace = newArr.find(p => p.type === index);

		identifiedPlace.color = "rgba(48,86,4,1)";

		toggleColorHandler(newArr);

		console.log(index);
		console.log(identifiedPlace.color);
		props.navigation.navigate(identifiedPlace.type);
	};

	return(
		<View style={{ flex: 1 }}>
			<AppHeader navigation={props.navigation} title='Home' />
			<View style={styles.container}>
				<View>
					<Text style={styles.textHome}>SELECT CATEGORY {"\n"}</Text>
				</View>
				<View style={styles.innerContainer}>
					{selectedOption.map(option => {
						return (
							<View style={styles.buttonHome}>
								<ButtonFilled
									buttonText={option.type}
									index={option.type}
									onClick={onClickHandler}
									color={option.color}
								/>
							</View>
						);
					})}
				</View>
				<Text style={styles.needHelp}>Need Help?</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		backgroundColor: "rgba(18,18,18,1)",
		width: "100%",
		height: "100%"
	},
	buttonHome: {
		marginBottom: 20
	},

	textHome: {
		color: "rgba(255,255,255,1)",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 28
	},
	needHelp: {
		bottom: 20,
		color: "rgba(255,255,255,1)",
		position: "absolute"
	}
});

export default Home;
