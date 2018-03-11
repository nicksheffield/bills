// @flow
import { handleActions } from 'redux-actions'
import { createAllActions, createMetaActions } from '../stateUtils'

export const actions = {
	meta: createMetaActions('users'),
	load: createAllActions('users-load'),
}

const defaultState = []

export default handleActions({
	[actions.load.success]: (state, { payload }) => ({ token: payload })
}, defaultState)
