import React, { Component } from 'react'
import axios from 'axios'
import config from 'config'
import store from 'state'
import Page from 'components/Page'

export default (query, mapVariables) => Target => {
	return class GraphQL extends Component {
		state = {
			loading: true,
			data: null
		}
		
		componentWillMount() {
			this.load()
		}

		load = () => {
			const variables = typeof mapVariables === 'function' ?
				mapVariables(store.getState(), this.props) :
				mapVariables

			axios.post(config.api, { query, variables }).then(res => {
				this.setState({
					loading: false,
					data: res.data.data
				})
			})
		}

		render() {
			return this.state.loading ? (
				<Page>
					<div>Loading...</div>
				</Page>
			) : (
				<Target
					{...this.props}
					graphql={this.state.data || {}}
					loading={this.state.loading}
					reload={this.load}
				/>
			)
		}
	}
}