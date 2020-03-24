//All the screens will be visible in this component.
import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import LogIn from "../screens/LogIn";
import Home from "../screens/Home";
import Hidden from "../screens/Hidden";
import drawerContentComponents from "./DrawerContentComponents";
import Library from "../screens/Library";
import Society from "../screens/Society";
import Status from "../screens/Status";
import EarlyLeave from "../screens/EarlyLeave";
import LateEntry from "../screens/LateEntry";

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
			screen: Status
		},
		Logout: {
			screen: LogIn
		},
		Society:{
			screen: Society,
			navigationOptions :{
				drawerLabel:<Hidden />
			}
		},
		Library:{
			screen: Library,
			navigationOptions :{
				drawerLabel:<Hidden />
			}
		},
		LateEntry: {
			screen: LateEntry,
			navigationOptions :{
				drawerLabel:<Hidden />
			}
		},
		EarlyLeave: {
			screen: EarlyLeave,
			navigationOptions :{
				drawerLabel:<Hidden />
			}
		},
		
	   
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
