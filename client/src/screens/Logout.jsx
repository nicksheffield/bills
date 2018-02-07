import { Component } from 'react'
import store from 'state'
import { LOGOUT } from 'state/user'

export default class Logout extends Component {

	componentWillMount() {
		store.dispatch({ type: LOGOUT })
		this.props.history.push('/login')
	}

	render() {
		return null
	}
}