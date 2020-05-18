// Warden screen of the app.

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, RefreshControl } from 'react-native';
import AppHeader from '../components/navigation/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native-gesture-handler';
import Post from '../components/Post';
import { AuthContext } from '../components/context/auth-context';

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
const Caretaker = (props) => {
  const auth = useContext(AuthContext);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPermis, setLoadedPermis] = useState();

  const [spinner, setSpinner] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      setIsLoading(true);
      setSpinner(true);
      const response = await fetch('http://192.168.43.33:5000/api/permi/all');
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setLoadedPermis(responseData.All_permis_by_user);
      console.log(responseData[0]._id.getTimestamp());
    } catch (err) {
      setError(err.message);
    }
    setSpinner(false);
    setIsLoading(false);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setSpinner(true);
        const response = await fetch('http://192.168.43.33:5000/api/permi/all');
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedPermis(responseData.All_permis_by_user);
      } catch (err) {
        setError(err.message);
      }
      setSpinner(false);
      setIsLoading(false);
    };
    fetchData();
  }, [, isClicked]);
  const creationDateTime = (id) => {
    return new Date(parseInt(id.substring(0, 8), 16) * 1000).toString();
  };

  const callOnClickHandler = () => {
    setIsClicked(!isClicked);
  };
  return (
    <View
      style={{ flex: 1, height: '100%', backgroundColor: 'rgba(18,18,18,1)' }}
    >
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        color="white"
        textStyle={styles.spinnerTextStyle}
      />
      <AppHeader navigation={props.navigation} title="Permission Status" />
      <ScrollView
        horizontal={false}
        contentContainerStyle={styles.scrollArea3_contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',

            textAlign: 'center',
            margin: '10%',
            fontSize: 22,

            color: 'white',
          }}
        >
          Permission Requests
        </Text>

        <View style={styles.container}>
          <View style={styles.scrollArea3}>
            {!isloading && loadedPermis == '' && (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  marginTop: '30%',
                  fontSize: 18,
                  backgroundColor: 'rgba(15,15, 15,0.7)',
                  padding: 15,
                }}
              >
                No Permission requests to show.
              </Text>
            )}
            {!isloading &&
              loadedPermis &&
              loadedPermis.map((loadedPermi) => {
                return (
                  <Post
                    style={styles.scrollViewEntry}
                    style={styles.scrollViewEntry}
                    status={loadedPermi.status}
                    category={loadedPermi.category}
                    categoryRequest={loadedPermi.category.split(' ')[0]}
                    outtime={loadedPermi.outtime}
                    date={loadedPermi.date}
                    destination={loadedPermi.destination}
                    intime={loadedPermi.intime}
                    society={loadedPermi.society}
                    key={loadedPermi._id}
                    id={loadedPermi._id}
                    creator={loadedPermi.creator}
                    creationDateTime={creationDateTime}
                    room={loadedPermi.room_num}
                    isCalled={callOnClickHandler}
                  ></Post>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imagestyles: {
    backgroundColor: 'rgba(18,18,18,1)',
  },
  scrollArea3: {
    backgroundColor: 'rgba(18,18,18,1)',
    borderColor: '#000000',
    borderWidth: 0,
  },
  image: {
    width: '100%',
    height: 200,
  },
  container: {},
  scrollViewEntry: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(38,90,32,0.63)',
  },

  scrollArea3_contentContainerStyle: {
    flexDirection: 'column',
    backgroundColor: 'rgba(18,18,18,1)',
  },
  spinnerTextStyle: {
    color: 'white',
  },
});

export default Caretaker;
