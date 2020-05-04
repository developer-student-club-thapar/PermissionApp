//component has been used in navigation.js to create a custom Drawer.

import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { AuthContext } from "../context/auth-context";

const DrawerContentComponent = (props) => {
	const auth = useContext(AuthContext);
	const logout = () => {
		auth.logout();
	};

	useEffect(() => {
		if (!auth.token) {
			props.navigation.navigate("LogIn");
		}
	}, [auth.token]);

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>
				Hi, {auth.name}!{"\n"}
			</Text>

			{auth.category == "Student" && (
				<View style={styles.drawerText}>
					<DrawerItems
						{...props}
						getLabel={(scene) => (
							<View style={styles.button}>
								{(props.getLabel(scene) == "Home" ||
									props.getLabel(scene) == "Status") && (
									<Text style={styles.buttonText}>{props.getLabel(scene)}</Text>
								)}
							</View>
						)}
					/>
					<Button title='Logout' color='transparent' onPress={logout} />
				</View>
			)}
			{auth.category == "Warden" && (
				<View style={styles.drawerText}>
					<DrawerItems
						{...props}
						getLabel={(scene) => (
							<View style={styles.button}>
								{props.getLabel(scene) == "PreviousWarden" && (
									<Text style={styles.buttonText}>Previous Requests</Text>
								)}
							</View>
						)}
					/>
					<Button title='Logout' color='transparent' onPress={logout} />
				</View>
			)}
			{auth.category == "Caretaker" && (
				<View style={styles.drawerText}>
					<DrawerItems
						{...props}
						getLabel={(scene) => (
							<View style={styles.button}>
								{props.getLabel(scene) == "PreviousWarden" && (
									<Text style={styles.buttonText}>Previous Requests</Text>
								)}
							</View>
						)}
					/>
					<Button title='Logout' color='transparent' onPress={logout} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: "rgba(18,18,18,1)",
		height: "100%",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	headerText: {
		color: "white",
		fontSize: 22,
	},
	buttonText: {
		fontSize: 18,
		color: "white",
		padding: 10,
	},
	headerContainer: {
		height: 150,
	},
	button: {},
	screenContainer: {
		paddingTop: 20,
		width: "100%",
	},
});
export default DrawerContentComponent;
