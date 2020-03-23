//Header is the navigation panel of the app.

import React from "react";
import { Header } from "react-native-elements";
import NavCenterComponent from "./NavCenterComponent";
import Menu from "./Menu";

const AppHeader = props => {
	return (
		<Header
			backgroundColor='rgba(18,18,18,1)'
			leftComponent={<Menu navigation={props.navigation} />}
			centerComponent={<NavCenterComponent />}
			statusBarProps={{ barStyle: "light-content" }}
		/>
	);
};

export default AppHeader;
