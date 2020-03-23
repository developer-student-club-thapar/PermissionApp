import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { DrawerItems } from "react-navigation-drawer";

const DrawerContentComponent = props => {
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Hi, Username!</Text>
			<View style={styles.drawerText}>
				<DrawerItems
					{...props}
					getLabel={scene => (
						<View style={styles.button}>
							<Text style={styles.buttonText}>{props.getLabel(scene)}</Text>
						</View>
					)}
				/>
			</View>
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
		justifyContent: "center"
	},
	headerText: {
		color: "white",
		fontSize: 22
	},
	buttonText: {
		fontSize: 18,
		color: "white",
		padding: 10
	},
	headerContainer: {
		height: 150
	},
	button: {},
	screenContainer: {
		paddingTop: 20,
		width: "100%"
	}
});
export default DrawerContentComponent;
