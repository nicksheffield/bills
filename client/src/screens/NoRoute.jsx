import React from 'react'
import Page from 'components/Page'
import { NavLink } from 'react-router-dom'

export default () => (
	<Page>
		<h1 className="mb-5">404: <span style={{ fontWeight: 200 }}>Nothin' found</span></h1>
		<NavLink to={'/'}>Get me the fuck outta here</NavLink>
	</Page>
)
