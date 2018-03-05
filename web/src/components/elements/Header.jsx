import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { nav } from 'core/routes'
import { map, exec, classes } from 'funcs'
import { Row } from './Layout'
import { Button } from './Button'
import { Breadcrumbs } from './Breadcrumbs'

export class Header extends React.Component {
	constructor() {
		super()
	}

	render() {
		const logo = '/client/assets/images/logo.svg'

		return (
			<div className="Header">
				<nav className="navbar navbar-expand-md navbar-dark bg-dark p-3 justify-content-between">
					<Row align="center">
						<img src={logo} alt="" className="Logo mr-3" />
						<Link to={'/'} className="navbar-brand">Quartermaster</Link>
					</Row>

					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav ml-auto" style={{alignItems: 'center'}}>
							{nav.length ? map(nav, (link, i) => (
								link.show() ? (
									<NavLink key={i} to={exec(link.url)} className="nav-item nav-link" activeClassName="active" >
										{exec(link.name)}
									</NavLink>
								) : null
							)) : null}
							<Button type="info" to="/book" text="Create booking" {...classes('ml-3', 'f-o2', 'f-o1-m')} />
						</div>
					</div>
				</nav>

				<Breadcrumbs />
			</div>
		)
	}
}
