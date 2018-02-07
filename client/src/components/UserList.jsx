import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Icon from 'components/Icon'
import { g } from 'utils'

const List = styled.ul.attrs({
	className: 'list-group'
})``

const Item = styled.li.attrs({
	className: 'list-group-item'
})`
	cursor: pointer;

	${props => props.active && `
		font-weight: bold;
	`}
	
	&:hover {
		background: whitesmoke;
	}
	
	i.fa {
		margin-left: 1em;
	}
`

export default class UserList extends Component {

	choose = (value) => (event) => {
		event.preventDefault()
		
		if (this.props.onChange) {
			this.props.onChange(value)
		}
	}

	isActive = (user) => this.props.value.indexOf(user) !== -1

	render() {
		const { users = [], value } = this.props

		return (
			<Fragment>
				{users.map((user, i) => (
					<button
						key={i}
						className={[
							'mr-2',
							'btn',
							'btn-light',
							this.isActive(user) ? 'active' : ''
						].join(' ')}
						style={{ cursor: 'pointer' }}
						onClick={this.choose(user)}
						aria-pressed={this.isActive(user) ? 'true' : 'false'}
					>
						{user.name}
						{this.isActive(user) && <Icon symbol="check" className="ml-2" />}
					</button>
				))}
			</Fragment>
		)
	}
}
