import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Index = props => {
	return (
		<TouchableOpacity
			onPress={() => props.onClick(props.buttonText)}
			style={[styles.container, { backgroundColor: props.color }]}
		>
			<Text style={styles.text2}>{props.buttonText}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(95,0,14,1)",
		opacity: 1,
		borderRadius: 20,
		shadowColor: "rgba(0,0,0,1)",
		shadowOpacity: 0.87,
		overflow: "visible",
		width: 300
	},
	text2: {
		color: "rgba(253,253,253,1)",
		textAlign: "center",
		justifyContent: "center",
		margin: "auto",
		padding: 15,
		fontSize: 18,
		fontWeight: "bold"
	}
});

export default Index;
