//component used in center of the navigation bar i.e thapar logo
import React from "react";
import { Image, StyleSheet } from "react-native";

const NavCenterComponent = props => {
	return (
		<Image
			source={require("../../assets/images/thapar.png")}
			resizeMode='contain'
			style={styles.logoImage}
		></Image>
	);
};
const styles = StyleSheet.create({
	logoImage: {}
});

export default NavCenterComponent;
