//All the screens will be visible in this component.
import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import LogIn from "../screens/LogIn";
import Home from "../screens/Home";
import Hidden from "../screens/Hidden";
import drawerContentComponents from "./DrawerContentComponents";

const AppNavigator = createDrawerNavigator(
	{
		LogIn: {
			screen: LogIn,
			navigationOptions: {
				drawerLabel: <Hidden />
			}
		},
		Home: {
			screen: Home
		},
		Status: {
			screen: Home
		},
		Logout: {
			screen: Home
		}
	},
	{
		contentComponent: drawerContentComponents
	}
);

export default createAppContainer(AppNavigator);
// const MyStack = createStackNavigator({
// 	Announcement: {
// 		screen: Announcement
// 	},
// 	Complaint: {
// 		screen: Complaint
// 	},
// 	Chat: {
// 		screen: Chat
// 	},
// 	MessMenu: {
// 		screen: MessMenu
// 	}
// });
// const MyDrawer = createDrawerNavigator(
// 	{
// 		Main: { screen: MyStack }
// 	},
// 	{ contentComponent: Announcement }
// );

// const RootStack = createStackNavigator({
// 	LogIn: {
// 		screen: LogIn
// 	},
// 	Drawer: {
// 		screen: MyDrawer,
// 		navigationOptions: { header: null }
// 	}
// });
// export default createAppContainer(RootStack);
