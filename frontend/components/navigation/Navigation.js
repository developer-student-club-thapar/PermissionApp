//All the screens will be visible in this component.
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import LogIn from '../../screens/LogIn';
import Home from '../../screens/Home';
import Hidden from '../../screens/Hidden';
import drawerContentComponents from './DrawerContentComponents';
import Library from '../../screens/Library';
import Society from '../../screens/Society';
import Status from '../../screens/Status';
import EarlyLeave from '../../screens/EarlyLeave';
import LateEntry from '../../screens/LateEntry';
import Caretaker from '../../screens/Caretaker';
import Warden from '../../screens/Warden';
import PreviousWarden from '../../screens/PreviousWarden';
import ChangePassword from '../../screens/ChangePassword';

//main function to create a navigation drawer
const Navigation = createDrawerNavigator(
  {
    LogIn: {
      screen: LogIn,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    Home: {
      screen: Home,
    },
    Status: {
      screen: Status,
    },
    Society: {
      screen: Society,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },

    Library: {
      screen: Library,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    LateEntry: {
      screen: LateEntry,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    EarlyLeave: {
      screen: EarlyLeave,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },

    Caretaker: {
      screen: Caretaker,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    Warden: {
      screen: Warden,
    },
    PreviousWarden: {
      screen: PreviousWarden,
    },
    ChangePassword: {
      screen: ChangePassword,
    },
  },
  {
    //To customise the side Drawer
    contentComponent: drawerContentComponents,
  },
);

export default createAppContainer(Navigation);
