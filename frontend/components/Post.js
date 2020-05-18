//Component has been used in Caretaker and warden screen to show the permission requests. This is the layout of each request.

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import ViewMoreText from 'react-native-view-more-text';

const Post = (props) => {
  //To show the full request box
  const renderViewMore = (onPress) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.containerButton}>
        <Text style={styles.caption}>View Full Request</Text>
      </TouchableOpacity>
    );
  };
  //To hide some content from the request box.
  const renderViewLess = (onPress) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.containerButton}>
        <Text style={styles.caption}>View Less</Text>
      </TouchableOpacity>
    );
  };
  const grantPermission = async () => {
    const response = await fetch(
      'http://192.168.43.33:5000/api/permi/' +
        props.categoryRequest +
        '/' +
        props.id,
      {
        method: 'PATCH',
        body: JSON.stringify({
          status: 'accepted',
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    props.isCalled();
  };
  const declinePermission = async () => {
    const response = await fetch(
      'http://192.168.43.33:5000/api/permi/' +
        props.categoryRequest +
        '/' +
        props.id,
      {
        method: 'PATCH',
        body: JSON.stringify({
          status: 'rejected',
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    props.isCalled();
  };
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.group}>
        <Text style={styles.text2}>
          {props.creationDateTime(props.id).substring(0, 3)},{' '}
          {props.creationDateTime(props.id).substring(3, 16)}
          {'\n '}
        </Text>
      </View>
      <ViewMoreText
        numberOfLines={1}
        renderViewMore={renderViewMore}
        renderViewLess={renderViewLess}
        textStyle={{ textAlign: 'left', color: 'white', fontSize: 14 }}
      >
        <Text>
          Room No: {props.room}
          {'\n'}
        </Text>

        <Text>
          Date: {props.date}
          {'\n'}
        </Text>

        {props.category == 'early leave' && (
          <Text>
            Out Time:{parseInt(props.outtime.substring(0, 2)) % 12 || 12}
            {props.outtime.substring(5, 7) && ':'}
            {props.outtime.substring(5, 7)}{' '}
            {parseInt(props.outtime.substring(0, 2)) >= 12 ? 'pm' : 'am'}
            {'\n'}
            Destination: {props.destination}
          </Text>
        )}
        {props.category == 'late entry' && (
          <Text>
            In Time: {parseInt(props.intime.substring(0, 2)) % 12 || 12}
            {props.intime.substring(5, 7) && ':'}
            {props.intime.substring(5, 7)}{' '}
            {parseInt(props.intime.substring(0, 2)) >= 12 ? 'pm' : 'am'}
            {'\n'}
            Destination: {props.destination}
          </Text>
        )}
        {props.category == 'library' && (
          <Text>
            Out Time: {parseInt(props.outtime.substring(0, 2)) % 12 || 12}
            {props.outtime.substring(5, 7) && ':'}
            {props.outtime.substring(5, 7)}{' '}
            {parseInt(props.outtime.substring(0, 2)) >= 12 ? 'pm' : 'am'}
            {'\n'}
            In Time: {parseInt(props.intime.substring(0, 2)) % 12 || 12}
            {props.intime.substring(5, 7) && ':'}
            {props.intime.substring(5, 7)}{' '}
            {parseInt(props.intime.substring(0, 2)) >= 12 ? 'pm' : 'am'}
          </Text>
        )}
        {props.category == 'society' && (
          <Text>
            Out Time: {parseInt(props.outtime.substring(0, 2)) % 12 || 12}
            {props.outtime.substring(5, 7) && ':'}
            {props.outtime.substring(5, 7)}{' '}
            {parseInt(props.outtime.substring(0, 2)) >= 12 ? 'pm' : 'am'}
            {'\n'}
            In Time: {parseInt(props.intime.substring(0, 2)) % 12 || 12}
            {props.intime.substring(5, 7) && ':'}
            {props.intime.substring(5, 7)}{' '}
            {parseInt(props.intime.substring(0, 2)) >= 12 ? 'pm' : 'am'}
            {'\n'}
            Society Name: {props.society}
          </Text>
        )}
      </ViewMoreText>
      <View style={styles.rect2}>
        <View style={styles.iconRow}>
          <View style={styles.rowContainer}>
            <IoniconsIcon name="ios-globe" style={styles.icon}></IoniconsIcon>
            <View style={styles.group2}>
              <Text style={styles.text3}>
                {'\t'}
                {props.category}
              </Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <EvilIconsIcon name="clock" style={styles.icon2}></EvilIconsIcon>
            <Text style={styles.text4}>
              {'\t'}
              {parseInt(props.creationDateTime(props.id).substring(16, 18)) %
                12 || 12}
              :{props.creationDateTime(props.id).substring(19, 21)}{' '}
              {parseInt(props.creationDateTime(props.id).substring(16, 18)) >=
              12
                ? 'pm'
                : 'am'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.rect3}>
        <TouchableOpacity
          style={styles.containerButton1}
          onPress={grantPermission}
        >
          <Text style={styles.caption}>Grant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerButton2}
          onPress={declinePermission}
        >
          <Text style={styles.caption}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconcontainer: {
    height: '100%',
    width: '100%',
  },
  containerButton: {
    backgroundColor: 'transparent',
    elevation: 3,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2,
    shadowOffset: {
      height: 4,
      width: -2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  containerButton1: {
    backgroundColor: 'rgba(20,46,76,1)',
    elevation: 3,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2,
    shadowOffset: {
      height: 4,
      width: -2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 5,
    width: '40%',
  },
  containerButton2: {
    backgroundColor: '#212121',
    elevation: 3,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2,
    shadowOffset: {
      height: 4,
      width: -2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 5,
    width: '40%',
    textAlign: 'center',
  },
  caption: {
    color: 'rgba(255,255,255,1)',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  group: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text2: {
    color: 'rgba(245,241,241,1)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rect2: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
  },
  rect3: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  icon: {
    color: 'grey',
    fontSize: 18,
  },
  group2: {},
  text3: {
    color: 'white',
    fontSize: 14,
  },
  icon2: {
    color: 'grey',
    fontSize: 18,
  },
  text4: {
    color: 'white',
    fontSize: 14,
  },
  iconRow: {
    height: 18,
    flexDirection: 'row',
    flex: 1,

    alignItems: 'center',
  },

  icon3: {
    color: 'rgba(57,159,52,1)',
    fontSize: 40,
  },
});
export default Post;
