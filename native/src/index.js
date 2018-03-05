import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, AppState, Alert } from 'react-native'
import moment from 'moment'

import Analytics from 'appcenter-analytics'
import Crashes from 'appcenter-crashes'
import Push from 'appcenter-push'

// import {NotificationsAndroid} from 'react-native-notifications';

// // On Android, we allow for only one (global) listener per each event type.
// NotificationsAndroid.setNotificationReceivedListener((notification) => {
// 	console.log("Notification received on device", notification.getTitle(), notification.getMessage(), notification.getData());
// });
// NotificationsAndroid.setNotificationOpenedListener((notification) => {
// 	console.log("Notification opened by device user", notification.getTitle(), notification.getMessage(), notification.getData());
// });

export default class App extends Component {

	componentDidMount() {
		// Push.setListener({
		// 	onPushNotificationReceived: function (pushNotification) {
		// 		let { message, title } = pushNotification

		// 		if (message === null || message === undefined) {
		// 			// Android messages received in the background don't include a message. On Android, that fact can be used to
		// 			// check if the message was received in the background or foreground. For iOS the message is always present.
		// 			title = 'Android background'
		// 			message = '<empty>'
		// 		}

		// 		// Custom name/value pairs set in the App Center web portal are in customProperties
		// 		if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
		// 			message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties)
		// 		}

		// 		if (AppState.currentState === 'active') {
		// 			Alert.alert(title, message)
		// 		}
		// 		else {
		// 			// Sometimes the push callback is received shortly before the app is fully active in the foreground.
		// 			// In this case you'll want to save off the notification info and wait until the app is fully shown
		// 			// in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
		// 			// when the app is fully in the foreground.
		// 		}
		// 	}
		// })
	}

	trackEvent = () => {
		Analytics.trackEvent("My custom event").then(() => console.log('event tracked'))
	}

	nativeCrash = () => {
		Crashes.generateTestCrash()
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Yo waddup</Text>
				<Button title="Track Event" onPress={() => this.trackEvent()} />
				<Button title="Native crash" onPress={() => this.nativeCrash()} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
})
