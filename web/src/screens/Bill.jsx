import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from 'components/Page'
import Button from 'components/Button'
import Icon from 'components/Icon'
import moment from 'moment'
import axios from 'axios'
import config from 'config'

import styled from 'styled-components'
import graphql from 'hoc/@graphql'
import guard from 'hoc/@guard'

const Table = styled.table.attrs({
	className: 'table'
})`
	& > tbody > tr > td {
		vertical-align: middle;
	}
`

const RowSpaceBetween = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const Date = styled.p`
	color: #999;
	margin: 0;
`

@graphql(`
	query($token: String!, $id: Int!) {
		bills(token: $token, id: $id) {
			id, total_amount, date, created_at
			billtype {
				id, name, icon
			}
			payments {
				id, amount, paid_at, confirmed_at
				user {
					id, name
				}
			}
		}
	}
`, (store, props) => ({
	token: localStorage.getItem('token'),
	id: props.match.params.id
}))
@connect(store => ({ user: store.user }))
@guard()
export default class Home extends Component {

	setPaid = (event) => {
		event.preventDefault()

		const { user: { user }} = this.props
		const bill = this.props.graphql.bills[0]
		const payment = bill.payments.find(x => x.user.id === user.id)

		// do axios graphql here
		axios.post(config.api, {
			query: `
				mutation($token: String!, $id: Int!, $paid_at: String) {
					changePayment(token: $token, id: $id, paid_at: $paid_at) {
						id
					}
				}
			`,
			variables: {
				token: localStorage.getItem('token'),
				id: payment.id,
				paid_at: moment().format('YYYY-MM-DD')
			}
		}).then(response => {
			this.props.reload()
		})
	}

	setConfirmed = (payment) => (event) => {
		const confirmed = event.target.checked

		// do axios graphql here
		axios.post(config.api, {
			query: `
				mutation($token: String!, $id: Int!, $confirmed_at: String) {
					changePayment(token: $token, id: $id, confirmed_at: $confirmed_at) {
						id
					}
				}
			`,
			variables: {
				token: localStorage.getItem('token'),
				id: payment.id,
				confirmed_at: confirmed ? moment().format('YYYY-MM-DD') : null
			}
		}).then(response => {
			this.props.reload()
		})
	}

	setPaid = (payment) => (event) => {
		const paid = event.target.checked

		// do axios graphql here
		axios.post(config.api, {
			query: `
				mutation($token: String!, $id: Int!, $paid_at: String) {
					changePayment(token: $token, id: $id, paid_at: $paid_at) {
						id
					}
				}
			`,
			variables: {
				token: localStorage.getItem('token'),
				id: payment.id,
				paid_at: paid ? moment().format('YYYY-MM-DD') : null
			}
		}).then(response => {
			this.props.reload()
		})
	}

	render() {
		const { user: { user }} = this.props
		const bill = this.props.graphql.bills[0]

		if (!bill) {
			return (
				<Page>
					<h1 className="mb-5">Bill Not Found</h1>
					There is no bill with id: {this.props.match.params.id}
				</Page>
			)
		}

		const payment = bill.payments.find(x => x.user.id === user.id)
		const allPaid = bill.payments.reduce((s, x) => s && x.confirmed_at, true)

		return (
			<Page>
				<RowSpaceBetween className="mb-3">
					<h1>Bill: {bill.billtype.name}</h1>
					<h1>${bill.total_amount}</h1>
				</RowSpaceBetween>

				<RowSpaceBetween className="mb-3" style={{ height: '50px' }}>
					<div>
						<Date>Posted: {moment(bill.created_at).format('Do MMM YYYY')}</Date>
						<Date>Date: {moment(bill.date).format('Do MMM YYYY')}</Date>
					</div>

					{user.admin ? (
						!payment.paid_at ? (
							<Button type="success" icon="credit-card" text="I've paid!" onClick={this.setPaid} disabled={!allPaid} />
						) : null
					) : (
						!payment.paid_at ? (
							<Button icon="credit-card" text="I've paid!" onClick={this.setPaid} />
						) : null
					)}
				</RowSpaceBetween>

				<Table>
					<thead>
						<tr>
							<th>User</th>
							<th>Amount</th>
							<th>Paid</th>
							<th>Confirmed</th>
						</tr>
					</thead>
					<tbody>
						{bill.payments.map(payment => (
							<tr key={payment.id}>
								<td>{payment.user.name}</td>
								<td>${(payment.amount).toFixed(2)}</td>
								<td>
									{payment.user.id !== user.id ? (
										user.admin ? (
											<input type="checkbox" checked={!!payment.paid_at} onChange={this.setPaid(payment)} />
										) : (
											!!payment.paid_at ? (
												<Icon symbol="check" />
											) : (
												<Icon symbol="times" />
											)
										)
									) : null}
								</td>
								<td>
									{payment.user.id !== user.id ? (
										user.admin ? (
											<input type="checkbox" checked={!!payment.confirmed_at} onChange={this.setConfirmed(payment)} />
										) : (
											!!payment.confirmed_at ? (
												<Icon symbol="check" />
											) : (
												<Icon symbol="times" />
											)
										)
									) : null}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Page>
		)
	}
}
