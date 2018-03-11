// @flow
import { handleActions } from 'redux-actions'
import { createAllActions, createMetaActions } from '../stateUtils'

export const actions = {
	meta: createMetaActions('auth'),
	login: createAllActions('auth-login'),
}

const defaultState = { token: null }

export default handleActions({
	[actions.login.success]: (state, { payload }) => ({ token: payload })
}, defaultState)
