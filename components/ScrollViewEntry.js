import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { ScrollView } from "react-native-gesture-handler";
import EntypoIcon from "react-native-vector-icons/Entypo";
const ScrollViewEntry = props => {
    return(
        <View style={[styles.container, props.style]}>
      <View style={styles.groupStack}>
        <View style={styles.group}>
          <Text style={styles.text2}>
            Tuesday,March 23,2020{"\n"}Name:{"\n"}RollNo:{"\n"}PhoneNo:{"\n"}RoomNo:
          </Text>
          <EntypoIcon name="check" style={styles.icon3}></EntypoIcon>
        </View>
        <View style={styles.rect2}>
          <View style={styles.iconRow}>
            <IoniconsIcon name="ios-globe" style={styles.icon}></IoniconsIcon>
            <View style={styles.group2}>
              <Text style={styles.text3}>Library</Text>
            </View>
            <EvilIconsIcon name="clock" style={styles.icon2}></EvilIconsIcon>
            <Text style={styles.text4}>11:00pm</Text>
          </View>
        </View>
      </View>
    </View>
    )
};

const styles=StyleSheet.create({
  container: {

  },
  iconcontainer:{
    height:"100%",
    width:"100%"
  },
  group: {
    top: 10,
    left: 0,
    width: 320,
    height: 100,
    position: "absolute",
    justifyContent:"space-between",
    flexDirection:"row"
  },
  text2: {
    height: 180,
    color: "rgba(245,241,241,1)",
    fontSize: 16,
    lineHeight: 20
  },
  rect2: {
    left: 10,
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 20,
    flexDirection: "row",
    alignItems:"center",
  },
  icon: {
    color: "grey",
    fontSize: 18
  },
  group2: {
    width: 100,
    height: 13,
    marginLeft: 0,
    marginTop: 1
  },
  text3: {
    color: "#121212",
    fontSize: 14
  },
  icon2: {
    color: "grey",
    fontSize: 18,
    marginLeft: 58
  },
  text4: {
    color: "#121212",
    fontSize: 14,
    marginLeft: 10,
    marginTop: 3
  },
  iconRow: {
    height: 18,
    flexDirection: "row",
    flex:1,
    marginRight: 0,
    marginTop: 20,
    justifyContent:"space-between",
    alignItems:"center"
  },
  groupStack: {
    width: 320,
    height: 150,
    marginTop: 7,
    marginLeft: 22
  },
  icon3:{
    color: "rgba(57,159,52,1)",
    fontSize: 40,
    top: 30,
    left: 50,
  }
})
export default ScrollViewEntry;