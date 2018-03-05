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

const Table = styled.table.attrs({
	className: 'table'
})`
	& > tbody > tr > td {
		vertical-align: middle;
	}
`

@graphql(`
	query($token: String!) {
		bills(token: $token) {
			id, total_amount, date
			billtype {
				id, name, icon
			}
			payments {
				id, paid, amount, paid_at, confirmed_at
				user {
					id, name
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

		let unpaidBills = bills.map(bill => {
			const yourPayment = bill.payments.find(x => x.user.id === you.id)

			return {
				bill,
				payment: yourPayment
			}
		}).filter(({ payment }) => !payment.paid)

		return (
			<Page>
				<h1 className="mb-5">Welcome {you.name}</h1>

				<h2 className="mb-3">Your pending bills</h2>
				
				<Table>
					<thead className="thead-light">
						<tr>
							<th style={{ width: '50px' }}></th>
							<th>Type</th>
							<th>Date</th>
							<th>Amount</th>
							<th>Paid</th>
							<th>Confirmed</th>
						</tr>
					</thead>
					<tbody>
						{unpaidBills.length ? unpaidBills.map(unpaid => (
							<tr
								key={unpaid.bill.id}
								style={
									unpaid.payment.paid_at && unpaid.payment.confirmed_at ? {
										color: '#ddd'
									} : null
								}
							>
								<td>
									<Button icon="eye" type="light" to={`bill/${unpaid.bill.id}`} />
								</td>
								<td>
									<Icon symbol={unpaid.bill.billtype.icon} />
									<Name left>{unpaid.bill.billtype.name}</Name>
								</td>
								<td>{moment(unpaid.bill.date).format('YYYY-MM-DD')}</td>
								<td>{(unpaid.payment.amount).toFixed(2)}</td>
								<td>
									{!!unpaid.payment.paid_at ? (
										<Icon symbol="check" />
									) : (
										<Icon symbol="times" />
									)}
								</td>
								<td>
									{!!unpaid.payment.confirmed_at ? (
										<Icon symbol="check" />
									) : (
										<Icon symbol="times" />
									)}
								</td>
							</tr>
						)) : (
							<tr>
								<td colSpan="4">All square!</td>
							</tr>
						)}
					</tbody>
				</Table>
			</Page>
		)
	}
}
