import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from 'components/Icon'
import Page from 'components/Page'
import Button from 'components/Button'
import moment from 'moment'
import styled from 'styled-components'
import graphql from 'hoc/@graphql'
import guard from 'hoc/@guard'

const Name = styled.span`
	margin-${props => props.left ? 'left' : 'right'}: 0.5em;
`

@graphql(`
	query($token: String!) {
		bills(token: $token, paid: false) {
			id
			total_amount
			date
			billtype {
				id
				name
				icon
			}
			payments(paid: false) {
				id
				paid
				amount
				user {
					id
					name
				}
			}
		}
	}
`, () => ({ token: localStorage.getItem('token') }))
@connect(store => ({ user: store.user }))
@guard()
export default class Home extends Component {
	render() {
		let { bills = [] } = this.props.graphql
		let you = this.props.user.user

		return (
			<Page>
				<h1 className="mb-5">Welcome {you.name}</h1>

				<h2 className="mb-3">Unpaid bills</h2>

				<table className="table">
					<thead className="thead-light">
						<tr>
							<th style={{ width: '50px' }}></th>
							<th>Type</th>
							<th>Date</th>
							<th>Amount</th>
							<th>Waiting on</th>
						</tr>
					</thead>
					<tbody>
						{bills.length ? bills.map(bill => (
							<tr key={bill.id}>
								<td>
									<Button icon="eye" type="light" to={`bill/${bill.id}`} />
								</td>
								<td>
									<Icon symbol={bill.billtype.icon} />
									<Name left>{bill.billtype.name}</Name>
								</td>
								<td>{moment(bill.date).format('YYYY-MM-DD')}</td>
								<td>${bill.total_amount}</td>
								<td>
									{bill.payments.length ? bill.payments.map(payment => (
										payment.user.id !== you.id && (
											<Name key={payment.id}>{payment.user.name}</Name>
										)
									)) : (
										<Name>Nobody</Name>
									)}
								</td>
							</tr>
						)) : (
							<tr>
								<td colSpan="4">All square!</td>
							</tr>
						)}
					</tbody>
				</table>
			</Page>
		)
	}
}
