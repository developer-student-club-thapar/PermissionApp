// Permission status page of the app.

import React, { Component } from "react";
import { View, Text, StyleSheet, Image, RefreshControl } from "react-native";
import AppHeader from "../components/navigation/Header";
import ScrollViewEntry from "../components/ScrollViewEntry";
import { ScrollView } from "react-native-gesture-handler";

function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}
const Status = props => {
	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);
	return (
		<View style={{ flex: 1 }}>
			<AppHeader navigation={props.navigation} title='Permission Status' />
			<ScrollView
				horizontal={false}
				contentContainerStyle={styles.scrollArea3_contentContainerStyle}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<View style={styles.imagestyles}>
					<Image
						source={require("../assets/images/status.jpg")}
						resizeMode='contain'
						style={styles.image}
					/>
					<Text
						style={{
							fontWeight: "bold",
							color: "white",
							position: "absolute",
							textAlign: "center",
							margin: "15%",
							fontSize: 22,
							backgroundColor: "rgba(15,15, 15,0.7)",
							padding: 15
						}}
					>
						PERMISSION STATUS
					</Text>
				</View>

				<View style={styles.container}>
					<View style={styles.scrollArea3}>
						<ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
						<ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
						<ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
						<ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
						<ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
						<ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
						<ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
						<ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
						<ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
						<ScrollViewEntry style={styles.scrollViewEntry}></ScrollViewEntry>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	imagestyles: {
		backgroundColor: "rgba(18,18,18,1)"
	},
	scrollArea3: {
		backgroundColor: "rgba(18,18,18,1)",
		borderColor: "#000000",
		borderWidth: 0
	},
	image: {
		width: "100%",
		height: 200
	},
	container: {},
	scrollViewEntry: {
		marginTop: 20,
		padding: 20,
		backgroundColor: "rgba(38,90,32,0.63)"
	},

	scrollArea3_contentContainerStyle: {
		flexDirection: "column",
		backgroundColor: "rgba(18,18,18,1)"
	}
});

export default Status;
