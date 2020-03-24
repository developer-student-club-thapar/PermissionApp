import React, { Component } from 'react';
import {View,Text,StyleSheet,ScrollView,Image} from 'react-native';
import AppHeader from '../components/Header';
import ScrollViewEntry from '../components/ScrollViewEntry';

const Status = props => {
    return(
        <View style={{flex:1}}>
         <AppHeader navigation={props.navigation} title="Permission Status"/>
         <View style={styles.imagestyles}>
          <Image
          source={require('../assets/images/status.jpg')}
          resizeMode="contain"
          style={styles.image} />
          <Text
    style={{
      fontWeight: 'bold',
      color: 'white',
      position: 'absolute', // child
      bottom: "45%", // position where you want
      left: "18%",
      fontSize:25
    }}
  >
    PERMISSION STATUS
  </Text>
         </View>
         <View style={styles.container}>
         <View style={styles.scrollArea3}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.scrollArea3_contentContainerStyle}>
          <ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
          <ScrollViewEntry style={styles.scrollViewEntry2}></ScrollViewEntry>
          <ScrollViewEntry style={styles.scrollViewEntry3}></ScrollViewEntry>
          <ScrollViewEntry style={styles.scrollViewEntry4}></ScrollViewEntry>
          <ScrollViewEntry style={styles.scrollViewEntry5}></ScrollViewEntry>
          <ScrollViewEntry style={styles.scrollViewEntry6}></ScrollViewEntry>
          <ScrollViewEntry style={styles.scrollViewEntry7}></ScrollViewEntry>
          <ScrollViewEntry style={styles.scrollViewEntry8}></ScrollViewEntry>
          <ScrollViewEntry style={styles.scrollViewEntry9}></ScrollViewEntry>
          <ScrollViewEntry style={styles.scrollViewEntry10}></ScrollViewEntry>
        </ScrollView>
      </View>
         </View>
      </View>

    );

};

const styles=StyleSheet.create({
    imagestyles:{
       backgroundColor:"black"
    },
    scrollArea3: {
        height: 523,
        backgroundColor: "rgba(18,18,18,1)",
        borderColor: "#000000",
        borderWidth: 0
      },
    image:{
        width:"100%",
        height:200
    },
    container:{
       width: 476,
       height: 523
    },
    scrollViewEntry:{
        marginTop:20,
        width: 501,
        height: 200,
        backgroundColor: "rgba(38,90,32,0.63)",
    },
    scrollViewEntry2:{
        marginTop:20,
        width: 501,
        height: 200,
        backgroundColor: "rgba(38,90,32,0.63)",
    },
    scrollViewEntry3:{
        marginTop:20,
        width: 501,
        height: 200,
        backgroundColor: "rgba(38,90,32,0.63)",
    },
    scrollViewEntry4:{
        marginTop:20,
        width: 501,
        height: 200,
        backgroundColor: "rgba(38,90,32,0.63)",
    },
    scrollViewEntry5:{
        marginTop:20,
        width: 501,
        height: 200,
        backgroundColor: "rgba(38,90,32,0.63)",
    },
    scrollViewEntry6:{
        marginTop:20,
        width: 501,
        height: 200,
        backgroundColor: "rgba(38,90,32,0.63)",
    },
    scrollViewEntry7:{
        marginTop:20,
        width: 501,
        height: 200,
        backgroundColor: "rgba(38,90,32,0.63)",
    },
    scrollViewEntry8:{
        marginTop:20,
        width: 501,
        height: 200,
        backgroundColor: "rgba(38,90,32,0.63)",
    },
    scrollViewEntry9:{
        marginTop:20,
        width: 501,
        height: 200,
        backgroundColor: "rgba(38,90,32,0.63)",
    },
    scrollViewEntry10:{
        marginTop:20,
        width: 501,
        height: 200,
        backgroundColor: "rgba(38,90,32,0.63)",
    },
    scrollArea3_contentContainerStyle: {
        height: 2615,
        flexDirection: "column"
      },
});

export default Status;
