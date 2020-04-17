// Home page is the select category page of our app.
import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	RefreshControl
} from "react-native";
import ButtonFilled from "../components/ButtonFilled";
import AppHeader from "../components/navigation/Header";
import { ScrollView } from "react-native-gesture-handler";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import Button from "../components/Button";
import Input from "../components/ui/Input";
import { VALIDATOR_REQUIRE } from "../components/Validator";
import Date from "../components/ui/Date";
import Time from "../components/ui/Time";

//wait function to return back a promise after refreshing the screen on pulling down
function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

//function that will be executed on calling dispatch() to check the form validity on each value change
const formReducer = (state, action) => {
	switch (action.type) {
		case "INPUT_CHANGE":
			let formIsValid = true;
			for (const inputId in state.inputs) {
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: { value: action.value, isValid: action.isValid }
				},
				isValid: formIsValid
			};

		default:
			return state;
	}
};

//This is the main function consisting of all the functionality of Society screen.
const Society = props => {
	//For refreshing the screen on pulling down
	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);

	//states declaration for the formData values in an object
	const [formData, setFormData] = useState({});
	const [clicked, setClick] = useState(false);

	// function for the submit button
	const onClickHandler = index => {
		setClick(true);
	};

	//to set the form Data object whenever value of clicked changes
	useEffect(() => {
		function func() {
			setFormData({
				Category: "Late Entry",
				room_num: formState.inputs.room_num.value,
				Date: formState.inputs.date.value,
				TimeLeave: formState.inputs.timeLeave.value,
				TimeEntry: formState.inputs.timeEntry.value,
				society_name: formState.inputs.society_name.value
			});
		}
		if (clicked) {
			func();
		}
	}, [clicked]);

	//to reset navigate to status page whenever form data changes and clicked is true.
	useEffect(() => {
		if (clicked) {
			sendRequest('http://localhost:5000/api/permi/society','POST',JSON.stringify({
				room_num: formState.inputs.room_num.value,
				society_name: formState.inputs.society_name.value,
				outtime: formState.inputs.outtime.value,
				intime: formState.inputs.intime.value,
				date: formState.inputs.date.value
				//to be added creator,userid-hooks
			}),
			{ 'Content-Type': 'application/json'}
			);
			props.navigation.navigate("Status");
			setClick(false);
		}
	}, [formData]);

	const [formState, dispatch] = useReducer(formReducer, {
		inputs: {
			room_num: {
				value: "",
				isValid: false
			},
			date: {
				value: "",
				isValid: false
			},
			timeLeave: {
				value: "",
				isValid: false
			},
			timeEntry: {
				value: "",
				isValid: false
			},
			societyName: {
				value: "",
				isValid: false
			}
		},
		isValid: false
	});

	//it will be triggered when value of id, value, isValid as the onInput function in the input.js component
	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: "INPUT_CHANGE",
			value: value,
			isValid: isValid,
			inputId: id
		});
	}, []);
	const upload = () => {};

	return (
		<View style={{ flex: 1 }}>
			<AppHeader navigation={props.navigation} title='Society' />
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					<View>
						<Text style={styles.textHome}>
							{"\n"}SOCIETY{"\n"}
						</Text>
					</View>
					<Input
						iconName='pencil'
						placeholder='Room Number'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter your room no.'
						onInput={inputHandler}
						afterSubmit={formData}
						id='room_num'
					/>
					<Date
						iconName='calendar'
						validators={[VALIDATOR_REQUIRE()]}
						afterSubmit={formData}
						onInput={inputHandler}
						errorText='Please enter Date of the event'
						id='date'
						holder='Event date'
					/>
					<Time
						iconName='clock'
						validators={[VALIDATOR_REQUIRE()]}
						afterSubmit={formData}
						onInput={inputHandler}
						errorText='Please enter leave time'
						id='timeLeave'
						holder='Leave Time'
					/>
					<Time
						iconName='clock'
						validators={[VALIDATOR_REQUIRE()]}
						afterSubmit={formData}
						onInput={inputHandler}
						errorText='Please enter expected time of Entry'
						id='timeEntry'
						holder='Entry Time'
					/>
					<Input
						iconName='pencil'
						placeholder='Society Name'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter your room no.'
						onInput={inputHandler}
						afterSubmit={formData}
						id='societyName'
					/>

					<ButtonFilled
						buttonText='Upload Document'
						onClick={upload}
						color='rgba(107,8,127,1)'
					/>

					<View style={styles.buttonHome}>
						<Button
							buttonText='Submit'
							onClick={onClickHandler}
							color='rgba(107,8,127,1)'
							textColor='white'
							disabled={!formState.isValid}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
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
		marginBottom: 20,
		marginTop: "10%"
	},
	editText: {
		color: "white"
	},
	timeText: {
		flex: 1,
		flexDirection: "row"
	},

	textHome: {
		color: "rgba(189,16,224,1)",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 28,
		marginBottom: 10,
		marginTop: "10%"
	}
});

export default Society;
