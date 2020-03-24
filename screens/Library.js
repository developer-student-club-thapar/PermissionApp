import React, { useState } from 'react';
import {StyleSheet,Text,View} from 'react-native';
import AppHeader from '../components/Header';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import Button from '../components/Button';

const Library = props => {
    const onClickHandler=index=>{
		console.log("work");
		props.navigation.navigate("Status");
    };
    const[isDatePickerVisible,setdatepickervisible]=useState(false);
    const[date,setdate]=useState("");
    const[clicked,clickhandler]=useState(false);

    const showDatePicker = () => {
        setdatepickervisible(true);
    };

    const hideDatePicker = () => {
        setdatepickervisible(false);
        setDate(moment(date).format("MMMM, Do YYYY"));
    };

    const handleConfirm = date => {
		hideDatePicker();
		clickHandler(true);
		console.warn("A date has been picked: ", date);
		console.log(date);
    };
    
    const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");
		setDate(currentDate);
	};


    return(
      <View style={{flex:1}}>
        <AppHeader navigation={props.navigation}/>
        <View style={styles.container}>
            <View>
	           <Text style={styles.textHome}>LIBRARY{'\n'}</Text>
            </View>
            <View style={styles.rect9}>
                <EvilIconsIcon name='pencil' style={styles.iconUser}></EvilIconsIcon>
                <TextInput placeholder='Room Number'
						placeholderTextColor='rgba(255,255,255,1)'
						secureTextEntry={false}
						style={styles.usernameInput}/>
            </View>
            <View style={styles.rect9}>
                <EvilIconsIcon name='calendar' style={styles.iconUser}></EvilIconsIcon>
                <TouchableOpacity onpress={showDatePicker}>
                {clicked && <Text style={styles.editText}>{Date}</Text>}
                {!clicked && <Text style={styles.editText}>Enter Date</Text>}
                </TouchableOpacity>
                <DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode='date'
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
						value={date}
						isDarkModeEnabled={true}
					/>
            </View>
            <View style={styles.rect9}>
            <EvilIconsIcon name='calendar' style={styles.iconUser}></EvilIconsIcon>
                <TouchableOpacity onpress={showDatePicker}>
                {clicked && <Text style={styles.editText}>{Date}</Text>}
                {!clicked && <Text style={styles.editText}>Enter Date</Text>}
                </TouchableOpacity>
                <DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode='date'
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
						value={date}
						isDarkModeEnabled={true}
					/>
            </View>
            <View style={styles.buttonHome}>
                <Button
                   buttonText="SUBMIT"
                   onClick={onClickHandler}
				   color='rgba(107,8,127,1)'
                />

                
            </View>
            
        </View>


      </View>
    );
};

const styles=StyleSheet.create({
    container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		backgroundColor: "rgba(18,18,18,1)",
		width: "100%",
		height: "100%"
	},
	buttonHome: {
		marginBottom: 20
	},
	editText: {
		color: "white"
	},

	textHome: {
		color: "rgba(255,255,255,1)",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 28
	},
	rect9: {
		backgroundColor: "rgba(251,247,247,0.25)",
		opacity: 1,
		marginBottom: 20,
		borderRadius: 5,
		flexDirection: "row",
		padding: 10,
		width: "80%"
	},
	iconUser: {
		color: "rgba(255,255,255,1)",
		fontSize: 30,
		marginLeft: 20,
		alignSelf: "center"
	},
	usernameInput: {
		color: "rgba(255,255,255,1)"
	}

});

export default Library;