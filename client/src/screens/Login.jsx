import React, { Component } from 'react'

import { connect } from 'react-redux'
import Button from 'components/Button'
import Page from 'components/Page'
import store from 'state'
import { LOGIN_REQUEST } from 'state/user'

@connect(store => ({ user: store.user }))
export default class Login extends Component {
	state = {
		formData: {
			email: null,
			password: null
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.loggedIn) {
			this.props.history.push('/')
		}
	}
	
	submit = event => {
		event.preventDefault()

		if (!this.state.formData.email || !this.state.formData.password) return

		store.dispatch({
			type: LOGIN_REQUEST,
			payload: this.state.formData
		})
	}

	syncInput = key => event => {
		let formData = {...this.state.formData}
		formData[key] = event.target.value
		this.setState({ formData })
	}

	render() {
		return (
			<Page>
				<h1 className="mb-4">Login</h1>

				<form onSubmit={this.submit}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							id="email"
							className="form-control"
							value={this.state.formData.email || ''}
							onInput={this.syncInput('email')}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Password</label>
						<input
							type="password"
							id="password"
							className="form-control"
							value={this.state.formData.password || ''}
							onInput={this.syncInput('password')}
						/>
					</div>
					<div className="form-group">
						<Button type="success" text="Submit" submit />
					</div>
				</form>
			</Page>
		)
	}
}