import { Alert } from 'react-native'

export const handleError = error => {
	let msg = error.errors.map(err => err.message).join(', ')

	console.log('Error', error)
	Alert.alert(msg)
}