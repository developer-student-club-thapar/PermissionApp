// Home page is the select category page of our app.

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native';
import ButtonFilled from '../components/ButtonFilled';
import AppHeader from '../components/navigation/Header';
import { ScrollView } from 'react-native-gesture-handler';

//wait function to return back a promise after refreshing the screen on pulling down
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

//This is the main function consisting of all the functionality of Home screen.
const Home = (props) => {
  //For refreshing the screen on pulling down
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  //State of the buttons of the home page. Selected Option is an array of objects with parameters: type and color.
  const [selectedOption, toggleColorHandler] = useState([
    { type: 'Library', color: 'rgba(95,0,14,1)', name: 'Library' },
    { type: 'LateEntry', color: 'rgba(95,0,14,1)', name: 'Late Entry' },
    { type: 'EarlyLeave', color: 'rgba(95,0,14,1)', name: 'Early Leave' },
    { type: 'Society', color: 'rgba(95,0,14,1)', name: 'Society' },
  ]);

  //Function to highlight the button being pressed out of the four options. currently used to navigate to the particular screen.
  const onClickHandler = (index) => {
    //to create a copy of the original array, so as not to change the original state.
    let newArr = [...selectedOption];
    //iterate over the array to find the one which was pressed and received in 'index' arguement.
    let identifiedPlace = newArr.find((p) => p.type === index);

    toggleColorHandler(newArr);

    //navigate to the pressed option using navigaton prop received from navigation.js
    props.navigation.navigate(identifiedPlace.type);
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader navigation={props.navigation} title="Home" />

      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <Text style={styles.textHome}>{'\n'}SELECT CATEGORY</Text>
          </View>
          <View style={styles.buttonContent}>
            {selectedOption.map((option) => {
              return (
                <View style={styles.buttonHome} key={option.type}>
                  <ButtonFilled
                    buttonText={option.name}
                    index={option.type}
                    key={option.type}
                    onClick={onClickHandler}
                    color={option.color}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>

        <Text style={styles.needHelp}>Need Help?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(18,18,18,1)',
    width: '100%',
    height: '100%',
  },
  buttonHome: {
    marginBottom: '10%',
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10%',
  },

  textHome: {
    color: 'rgba(255,255,255,1)',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: '10%',
    marginBottom: '10%',
  },
  needHelp: {
    color: 'rgba(255,255,255,1)',
    padding: 6,
    textAlign: 'center',
  },
});

export default Home;
