import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'
import { nav } from 'config/routes'
import { isLoggedIn } from 'utils'
import Button from 'components/Button'
import Icon from 'components/Icon'

const NavBar = styled.nav.attrs({
	className: props => {
		let classNames = 'navbar navbar-expand-lg p-3 mb-5'

		if (props.dark) {
			classNames += ' navbar-dark bg-dark'
		} else {
			classNames += ' navbar-light bg-light'
		}

		return classNames
	}
})`
	-webkit-font-smoothing: antialiased;
`

const Nav = styled.ul.attrs({
	className: 'navbar-nav ml-auto'	
})`
	display: flex;
	align-items: center;

	.nav-item {
		margin-left: 1em;
	}
`

const Logo = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 0.5em;
	font-size: 2.7em;

	${props => props.dark ? `
		background: #f8f9fa;
		color: #343a40;
	` : `
		background: #343a40;
		color: #f8f9fa;
	`}
	
	.fa {
		transform: rotate(90deg);
	}
`

@connect(store => ({ user: store.user }))
export class Header extends Component {
	render() {
		return (
			<NavBar dark={isLoggedIn()}>
				<Logo dark={isLoggedIn()}>
					<i className="fa fa-usd fa-fw" />
				</Logo>
				<Link className="navbar-brand" to="/">Michaels Ave Bills</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<Nav>
						{nav.map((item, i) => (
							item.show() && (
								<li key={i} className="nav-item">
									{item.elem === 'Button' ? (
										<Button to={item.url} icon={item.icon} type={item.type}>
											{item.title}
										</Button>
									) : (
										<NavLink className="nav-link" to={item.url} activeClassName="active" exact>
											{item.icon && (
												<Icon symbol={item.icon} className="mr-2" fixedWidth />
											)}
											{item.title}
										</NavLink>
									)}
								</li>
							)
						))}
					</Nav>
				</div>
			</NavBar>
		)
	}
}

const Loader = () => (
	<div>loading...</div>
)

export default class Page extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className="container">
					{this.props.children}
				</div>
			</div>
		)
	}
}