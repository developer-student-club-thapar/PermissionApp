// Library permission page of the app.
import React, { useState, useEffect } from "react";
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

//This is the main function consisting of all the functionality of Library screen.
const Library = props => {
	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);

	const onClickHandler = index => {};
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isTimeLeavePickerVisible, setTimeLeavePickerVisibility] = useState(
		false
	);
	const [isTimeEntryPickerVisible, setTimeEntryPickerVisibility] = useState(
		false
	);

	const [date, setDate] = useState("");
	const [timeLeave, setTimeLeave] = useState("");
	const [timeEntry, setTimeEntry] = useState("");

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
			<AppHeader navigation={props.navigation} title='Society' />
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
						<TouchableOpacity onPress={showDatePicker} style={styles.timeText}>
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
							<Text style={styles.editText}> Leave Time </Text>
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
						<EvilIconsIcon name='clock' style={styles.iconUser}></EvilIconsIcon>
						<TouchableOpacity
							style={styles.timeText}
							onPress={showTimeEntryPicker}
						>
							<Text style={styles.editText}> Expected Entry Time </Text>
							{timeEntry != "" && (
								<Text style={styles.editText}> : {timeEntry}</Text>
							)}
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={isTimeEntryPickerVisible}
							mode='time'
							onConfirm={handleTimeEntryConfirm}
							onCancel={hideTimeEntryPicker}
							isDarkModeEnabled={true}
							is24Hour={false}
						/>
					</View>

					<View style={styles.buttonHome}>
						<Button
							buttonText='Submit'
							onClick={onClickHandler}
							color='rgba(126,211,33,1)'
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
		color: "rgba(126,211,33,1)",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 28,
		marginBottom: 10
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

export default Library;
