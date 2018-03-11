// @flow
import { handleActions, createAction } from 'redux-actions'
import { createAllActions, createMetaActions } from '../stateUtils'

import routes from '../../config/routes'

export const actions = {
	route: createAction('route'),
}

const defaultState = {
	index: 0,
	currentRoute: {
		name: Object.keys(routes)[0],
		route: Object.values(routes)[0],
		data: {}
	},
	history: []
}

export default handleActions({
	[actions.route]: (state, { payload }) => {
		if (!routes[payload.route]) {
			console.error(`No route by the name of ${ payload.route }`)
			return state
		}
		
		return {
			index: state.currentRoute.length,
			currentRoute: {
				name: payload.route,
				route: routes[payload.route],
				data: payload.data || {}
			},
			history: [ ...state.history, state.currentRoute ]
		}
	}
}, defaultState)
