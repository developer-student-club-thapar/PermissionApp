// Late entry permission page of our app.
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	RefreshControl
} from "react-native";
import AppHeader from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import Button from "../components/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

//wait function to return back a promise after refreshing the screen on pulling down
function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

//This is the main function consisting of all the functionality of Late entry screen.
const LateEntry = props => {
	//For refreshing the screen on pulling down
	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);

	//Demo function for the submit button
	const onClickHandler = index => {
		props.navigation.navigate("Status");
	};

	//states declaration for the date and time picker fields status
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isTimeLeavePickerVisible, setTimeLeavePickerVisibility] = useState(
		false
	);
	const [isTimeEntryPickerVisible, setTimeEntryPickerVisibility] = useState(
		false
	);

	//states declaration for the date and time picker fields values
	const [date, setDate] = useState("");
	const [timeLeave, setTimeLeave] = useState("");

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = date => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = date => {
		hideDatePicker();
		setDate(moment(date).format("MMMM, Do YYYY"));
	};
	const showTimeLeavePicker = () => {
		setTimeLeavePickerVisibility(true);
	};
	const showTimeEntryPicker = () => {
		setTimeEntryPickerVisibility(true);
	};
	const hideTimeLeavePicker = () => {
		setTimeLeavePickerVisibility(false);
	};
	const hideTimeEntryPicker = timeEntry => {
		setTimeEntryPickerVisibility(false);
	};
	const handleTimeLeaveConfirm = timeLeave => {
		hideTimeLeavePicker();
		setTimeLeave(moment(timeLeave).format("HH : mm"));
	};
	const handleTimeEntryConfirm = timeEntry => {
		hideTimeEntryPicker();
		setTimeEntry(moment(timeEntry).format("HH : mm"));
	};

	return (
		<View style={{ flex: 1 }}>
			<AppHeader navigation={props.navigation} title='LateEntry' />
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					<View>
						<Text style={styles.textHome}>
							{"\n"}LATE ENTRY{"\n"}
						</Text>
					</View>
					<View style={styles.rect9}>
						<EvilIconsIcon
							name='pencil'
							style={styles.iconUser}
						></EvilIconsIcon>
						<TextInput
							placeholder='Room Number'
							placeholderTextColor='rgba(255,255,255,1)'
							secureTextEntry={false}
							style={styles.usernameInput}
						></TextInput>
					</View>
					<View style={styles.rect9}>
						<EvilIconsIcon
							name='calendar'
							style={styles.iconUser}
						></EvilIconsIcon>
						<TouchableOpacity onPress={showDatePicker}>
							{date != "" && <Text style={styles.editText}> {date}</Text>}
							{date == "" && <Text style={styles.editText}> Date </Text>}
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode='date'
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
							isDarkModeEnabled={true}
						/>
					</View>
					<View style={styles.rect9}>
						<EvilIconsIcon name='clock' style={styles.iconUser}></EvilIconsIcon>
						<TouchableOpacity
							style={styles.timeText}
							onPress={showTimeLeavePicker}
						>
							<Text style={styles.editText}>Time </Text>
							{timeLeave != "" && (
								<Text style={styles.editText}> : {timeLeave}</Text>
							)}
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={isTimeLeavePickerVisible}
							mode='time'
							onConfirm={handleTimeLeaveConfirm}
							onCancel={hideTimeLeavePicker}
							isDarkModeEnabled={true}
							is24Hour={false}
						/>
					</View>
					<View style={styles.rect9}>
						<EvilIconsIcon
							name='location'
							style={styles.iconUser}
						></EvilIconsIcon>
						<TextInput
							placeholder='Place you have returned from'
							placeholderTextColor='rgba(255,255,255,1)'
							secureTextEntry={false}
							style={styles.usernameInput}
						></TextInput>
					</View>
					<View style={styles.buttonHome}>
						<Button
							buttonText='Submit'
							onClick={onClickHandler}
							color='rgba(80,227,194,1)'
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
		marginBottom: 20
	},
	editText: {
		color: "white"
	},
	timeText: {
		flex: 1,
		flexDirection: "row"
	},

	textHome: {
		color: "rgba(80,227,194,1)",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 28,
		marginBottom: 10,
		marginTop: "10%"
	},
	rect9: {
		backgroundColor: "rgba(251,247,247,0.25)",
		opacity: 1,
		marginBottom: 20,
		borderRadius: 5,
		flexDirection: "row",
		padding: 10,
		width: "100%"
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

export default LateEntry;
