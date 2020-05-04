// Early leave permission page of our app.
import React, {
	useState,
	useEffect,
	useCallback,
	useReducer,
	useContext,
} from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	RefreshControl,
} from "react-native";
import ButtonFilled from "../components/ButtonFilled";
import AppHeader from "../components/navigation/Header";
import { ScrollView } from "react-native-gesture-handler";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import Button from "../components/Button";
import { VALIDATOR_REQUIRE } from "../components/Validator";
import Date from "../components/ui/Date";
import Time from "../components/ui/Time";
import Input from "../components/ui/Input";
import { AuthContext } from "../components/context/auth-context";

//wait function to return back a promise after refreshing the screen on pulling down
function wait(timeout) {
	return new Promise((resolve) => {
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
					[action.inputId]: { value: action.value, isValid: action.isValid },
				},
				isValid: formIsValid,
			};

		default:
			return state;
	}
};

//This is the main function consisting of all the functionality of Early Leave screen.
const EarlyLeave = (props) => {
	const auth = useContext(AuthContext);
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
	const onClickHandler = (index) => {
		setClick(true);
	};

	//to set the form Data object whenever value of clicked changes
	useEffect(() => {
		function func() {
			setFormData({
				Category: "Late Entry",
				RoomNumber: formState.inputs.roomNumber.value,
				Date: formState.inputs.date.value,
				Time: formState.inputs.time.value,
				Place: formState.inputs.location.value,
			});
		}
		if (clicked) {
			func();
		}
	}, [clicked]);

	//to reset navigate to status page whenever form data changes and clicked is true.
	useEffect(() => {
		async function fetchData() {
			if (clicked) {
				//console.log(formData);
				try {
					const response = await fetch(
						"http://192.168.43.33:5000/api/permi/early/",
						{
							method: "POST",
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
								Authorization: "Bearer " + auth.token,
							},
							body: JSON.stringify({
								room_num: formState.inputs.roomNumber.value,
								destination: formState.inputs.location.value,
								date: formState.inputs.date.value,
								outtime: formState.inputs.time.value,
								creator: auth.userId,
							}),
						}
					);
					const responseData = await response.json();
					//console.log(responseData);
				} catch (err) {
					console.log(err);
				}
				props.navigation.navigate("Status");
				setClick(false);
			}
		}
		fetchData();
	}, [formData]);

	const [formState, dispatch] = useReducer(formReducer, {
		inputs: {
			roomNumber: {
				value: "",
				isValid: false,
			},
			location: {
				value: "",
				isValid: false,
			},
			date: {
				value: "",
				isValid: false,
			},
			time: {
				value: "",
				isValid: false,
			},
		},
		isValid: false,
	});

	//it will be triggered when value of id, value, isValid as the onInput function in the input.js component
	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: "INPUT_CHANGE",
			value: value,
			isValid: isValid,
			inputId: id,
		});
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<AppHeader navigation={props.navigation} title='Early Leave' />
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					<View>
						<Text style={styles.textHome}>
							{"\n"}EARLY LEAVE{"\n"}
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
						errorText='Please enter expected Time of Entry'
						id='time'
						holder='Time'
					/>
					<Input
						iconName='location'
						placeholder='Place you have returned from'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Required!'
						onInput={inputHandler}
						afterSubmit={formData}
						id='location'
					/>
					<View style={styles.buttonHome}>
						<Button
							buttonText='Submit'
							onClick={onClickHandler}
							color='rgba(248,231,28,1)'
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
		height: "100%",
	},
	buttonHome: {
		marginBottom: 20,
		marginTop: "10%",
	},
	editText: {
		color: "white",
	},
	timeText: {
		flex: 1,
		flexDirection: "row",
	},

	textHome: {
		color: "rgba(248,231,28,1)",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 28,
		marginBottom: 10,
		marginTop: "10%",
	},
});

export default EarlyLeave;
