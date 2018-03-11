// @flow
import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'

import { actions as usersActions } from '../redux/users'
import { actions as routeActions } from '../redux/routing'

@connect(({ users, meta }) => ({ users, meta }))
export default class Home extends Component {

	loadUsers = () => {
		this.props.dispatch(usersActions.load.request())
	}

	goLogin = () => {
		this.props.dispatch(routeActions.route({ route: 'Login' }))
	}

	render() {
		const { users } = this.props

		return (
			<View>
				<Text style={styles.test}>This is the homepage</Text>

				<Button title="load users" onPress={this.loadUsers} />
				
				{users.length ? (
					users.map(user => (
						<Text style={styles.test} key={user.id}>No users</Text>
					))
				) : (
					<Text style={styles.test}>No users</Text>
				)}

				<Button title="to login" onPress={this.goLogin} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	test: {
		fontSize: 20
	}
})
