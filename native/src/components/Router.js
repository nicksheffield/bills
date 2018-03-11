// @flow
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

@connect((store) => ({
	routing: store.routing
}))
export default class Router extends Component {
	render() {
		const Component = this.props.routing.currentRoute.route.component
		const data = this.props.routing.currentRoute.data
		
		return (
			<Component {...this.props} routeData={data} />
		)
	}
}
