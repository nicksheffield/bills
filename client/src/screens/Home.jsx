import React, { Component } from 'react'
import { connect } from 'react-redux'

import Admin from 'screens/HomeAdmin'
import User from 'screens/HomeUser'

@connect(store => ({ user: store.user }))
export default class Home extends Component {
	render() {
		const { user: { user } } = this.props

		if (!user) return null

		return user.admin ? <Admin /> : <User />
	}
}