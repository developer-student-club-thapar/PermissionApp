// Library permission page of the app.
import React, { useState, useEffect, useReducer, useCallback } from "react";
import { StyleSheet, View, Text, RefreshControl } from "react-native";
import AppHeader from "../components/navigation/Header";
import { ScrollView } from "react-native-gesture-handler";
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

//This is the main function consisting of all the functionality of Library screen.
const Library = props => {
	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);

	// function for the submit button
	const onClickHandler = () => {
		setClick(true);
	};

	//states declaration for the formData values in an object
	const [formData, setFormData] = useState({});
	const [clicked, setClick] = useState(false);

	//to set the form Data object whenever value of clicked changes
	useEffect(() => {
		function func() {
			setFormData({
				Category: "Library",
				RoomNumber: formState.inputs.roomNumber.value,
				Date: formState.inputs.date.value,
				TimeLeave: formState.inputs.timeLeave.value,
				TimeEntry: formState.inputs.timeEntry.value
			});
		}
		if (clicked) {
			func();
		}
	}, [clicked]);

	//to reset navigate to status page whenever form data changes and clicked is true.
	useEffect(() => {
		if (clicked) {
			console.log(formData);
			props.navigation.navigate("Status");
			setClick(false);
		}
	}, [formData]);

	const [formState, dispatch] = useReducer(formReducer, {
		inputs: {
			roomNumber: {
				value: "",
				isValid: false
			},
			timeLeave: {
				value: "",
				isValid: false
			},
			date: {
				value: "",
				isValid: false
			},
			timeEntry: {
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

	return (
		<View style={{ flex: 1 }}>
			<AppHeader navigation={props.navigation} title='Library' />
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					<View>
						<Text style={styles.textHome}>
							{"\n"}LIBRARY{"\n"}
						</Text>
					</View>
					<Input
						iconName='pencil'
						placeholder='Room Number'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter your room no.'
						onInput={inputHandler}
						afterSubmit={formData}
						id='roomNumber'
					/>
					<Date
						iconName='calendar'
						validators={[VALIDATOR_REQUIRE()]}
						afterSubmit={formData}
						onInput={inputHandler}
						errorText='Please enter Date of Late Entry'
						id='date'
						holder='Date'
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

					<View style={styles.buttonHome}>
						<Button
							buttonText='Submit'
							onClick={onClickHandler}
							color='rgba(126,211,33,1)'
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
		color: "rgba(126,211,33,1)",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 28,
		marginBottom: 10,
		marginTop: "10%"
	}
});

export default Library;
