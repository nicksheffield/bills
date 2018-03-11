// @flow
import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { actions as authActions } from '../redux/auth'
import { actions as routeActions } from '../redux/routing'

type State = {
	formData: {
		email: ?string,
		password: ?string
	}
}

@connect(() => ({}))
export default class Home extends Component<State> {

	state = {
		formData: {}
	}

	syncInput = (key) => (value) => {
		this.setState({ formData: { ...this.state.formData, [key]: value } })
	}

	login = () => {
		this.props.dispatch(authActions.login.request(this.state.formData))
	}

	goHome = () => {
		this.props.dispatch(routeActions.route({ route: 'Home' }))
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<View style={styles.form}>
						<TextInput
							ref="email"
							placeholder='Email Address'
							value={this.state.formData.email}
							onChangeText={this.syncInput('email')}
							autoCapitalize='none'
							keyboardType="email-address"
							spellCheck={false}
						/>

						<TextInput
							ref="password"
							placeholder='Password'
							value={this.state.formData.password}
							onChangeText={this.syncInput('password')}
							autoCapitalize='none'
							keyboardType="default"
							spellCheck={false}
							secureTextEntry={true}
						/>

						<Button title="Login" onPress={this.login} />
						<Button title="to home" onPress={this.goHome} />
					</View>
				</View>
			</View>
		)
	}
}

const Heading = (props) => <Text style={styles.heading}>{props.children}</Text>

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#eee',
		minHeight: '100%',
		justifyContent: 'center'
	},
	heading: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		padding: 10,
		color: 'black'
	},

	form: {
		backgroundColor: '#fff',
		borderRadius: 5,
		marginHorizontal: 20,
		padding: 20
	}
})
