import React from 'react'
import { map, find } from 'funcs'
import { props, withRouter } from 'decorators'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { routes } from 'core/routes'
import styled from 'styled-components'

const BcList = styled.ul`
	padding-left: 2em !important;
	cursor: default;
	border-radius: 0;
	font-size: 0.8rem;
	background: #fff !important;
`

const BcLink = styled(Link)`
	color: inherit;
`

const BcItem = ({children}) => (
	<li className="breadcrumb-item">{children}</li>
)

@withRouter
export class Breadcrumbs extends React.Component {
	componentWillMount() {
		const { pathname } = this.props.location
		this.setState({
			thisCrumb: findThisCrumb(pathname),
			crumbs: getParentCrumbs(pathname)
		})
	}

	@props
	render({}, { thisCrumb, crumbs = [] }) {
		return (
			<BcList className="breadcrumb">
				<BcItem>
					<Icon symbol="home" />
				</BcItem>
				{map(crumbs, (crumb, i) => (
					<BcItem key={i}>
						<BcLink to={crumb.url}>{crumb.title}</BcLink>
					</BcItem>
				))}
				<BcItem className="active">
					<span>{thisCrumb.title}</span>
				</BcItem>
			</BcList>
		)
	}
}

function findThisCrumb(pathname) {
	const searchCrumb = find(routes, x => pathname.replace(/\d+/g, ':id') === x.url)
	return searchCrumb ? { url: pathname, title: searchCrumb.title } : {}
}

function getParentCrumbs(pathname, crumbs = []) {
	let parts = pathname.replace(/\d+/g, ':id').split('/')
	parts = parts.slice(0, parts.length - 1).join('/')

	let search = find(routes, x => x.url === parts)

	let url = pathname.split('/')
	url = url.slice(0, url.length - 1).join('/')

	if (search) {
		return getParentCrumbs(url, crumbs.concat({title: search.title, url}))
	} else {
		return crumbs.reverse()
	}
}
