import React, { Component } from 'react'
import { connect } from 'react-redux'

export default (url = '/login') => Target => {
	class Guard extends Component {
		state = {
			allowed: true
		}

		componentWillMount() {
			if (!this.props.user.loggedIn) {
				this.setState({ allowed: false })
				this.props.history.push(url)
			}
		}

		render() {
			return this.state.allowed ? (
				<Target {...this.props} />
			) : null
		}
	}

	return connect(store => ({ user: store.user }))(Guard)
}