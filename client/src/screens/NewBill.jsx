import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'components/Button'
import Page from 'components/Page'
import axios from 'axios'
import config from 'config'
import moment from 'moment'
import styled from 'styled-components'
import { g } from 'utils'

import { IceSelect, IceCalendar } from 'components/ice'
import UserList from 'components/UserList'

import graphql from 'hoc/@graphql'
import guard from 'hoc/@guard'

const FormGroup = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.5em;

	${props => props.push && `padding-left: ${props.push}px;`}
	${props => props.button && `margin-top: 2em;`}
`

const Label = styled.label`
	width: 100px;
`

const FormItem = styled.div`
	flex: 1;
`

@graphql(`
	query($token: String!) {
		users(token: $token, active: true) {
			id
			name
		}
		billtypes(token: $token) {
			id
			name
			default_amount
		}
	}
`, () => ({ token: localStorage.getItem('token') }))
@connect(store => ({ user: store.user }))
@guard()
export default class NewBill extends Component {
	state = {
		formData: {
			type: null,
			amount: 0,
			date: new Date(),
			users: []
		}
	}

	componentWillMount() {
		const formData = {...this.state.formData}
		formData.users = [...g(this.props, 'graphql.users')]
		this.setState({ formData })
	}

	submit = event => {
		event.preventDefault()

		if (!this.state.formData.type ||
			!this.state.formData.amount ||
			!this.state.formData.date) return

		const { formData } = this.state

		// do axios graphql here
		axios.post(config.api, {
			query: `
				mutation($token: String!,
					$type_id:    Int!,
					$amount:     Float!,
					$date:       String!,
					$user_ids:   [Int]!) {

					addBill(token:    $token,
						billtype_id:  $type_id,
						total_amount: $amount,
						date:         $date,
						user_ids:     $user_ids) {

						id
					}
				}
			`,
			variables: {
				token: localStorage.getItem('token'),
				type_id: formData.type.id,
				amount: formData.amount,
				user_ids: formData.users.map(x => x.id),
				date: moment(formData.date).format('YYYY-MM-DD')
			}
		}).then(response => {
			this.props.history.push('/')
		})
	}

	syncForm = key => value => {
		let formData = {...this.state.formData}
		formData[key] = value
		this.setState({ formData })
	}

	syncInput = key => event => {
		this.syncForm(key)(event.target.value)
	}

	selectType = value => {
		let formData = {...this.state.formData}
		formData.type = value
		formData.amount = value.default_amount || 0
		this.setState({ formData })
	}

	selectUser = user => {
		let formData = {...this.state.formData}
		let index = formData.users.indexOf(user)

		if (index !== -1) {
			formData.users.splice(index, 1)
			formData.users = [...formData.users]
		} else {
			formData.users = [...formData.users, user]
		}

		this.setState({ formData })
	}

	render() {
		const { formData } = this.state
		const { users = [] } = this.props.graphql

		return (
			<Page>
				<h1 className="mb-4">Add New Bill</h1>
				
				<form onSubmit={this.submit}>
					<FormGroup>
						<Label>Type</Label>
						<FormItem>
							<IceSelect
								items={this.props.graphql.billtypes}
								config={{ labelProp: 'name', idProp: 'id' }}
								onChange={this.selectType}
							/>
						</FormItem>
					</FormGroup>
					
					<FormGroup>
						<Label>Amount</Label>
						<FormItem>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">$</span>
								</div>
								<input
									type="number"
									value={formData.amount}
									onInput={this.syncInput('amount')}
									className="form-control"
								/>
							</div>
						</FormItem>
					</FormGroup>

					<FormGroup>
						<Label>Date</Label>
						<FormItem>
							<IceCalendar
								value={formData.date}
								onChange={this.syncForm('date')}
							/>
						</FormItem>
					</FormGroup>

					<FormGroup>
						<Label>Users</Label>
						<FormItem>
							<UserList
								value={formData.users}
								users={users}
								onChange={this.selectUser}
							/>
						</FormItem>
					</FormGroup>

					<FormGroup push={100} button>
						<Button type="success" icon="arrow-right" text="Create" submit />
					</FormGroup>
				</form>
			</Page>
		)
	}
}
