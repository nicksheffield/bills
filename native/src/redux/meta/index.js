import { handleActions } from 'redux-actions'

const storeActions = [
	require('../users').actions,
	require('../auth').actions,
]

const getKey = (action) => action.type.replace(/-\w*/, '')

const createDefaultState = (actionCreators) => actionCreators.reduce((acc, val) => ({
	...acc,
	[getKey(val.meta.loading())]: { loading: false }
}), {})

const createDefaultActions = (actionCreators) => actionCreators.reduce((acc, val) => ({
	...acc,
	[val.meta.loading]: (state, { payload }) => ({
		...state,
		[getKey(val.meta.loading())]: {
			...state[[getKey(val.meta.loading())]],
			loading: payload.loading
		}
	}),
	[val.meta.loaded]: (state, { payload }) => ({
		...state,
		[getKey(val.meta.loaded())]: {
			...state[[getKey(val.meta.loaded())]],
			loading: payload.loading
		}
	})
}), {})

const defaultState = createDefaultState(storeActions)

const actions = createDefaultActions(storeActions)

export default handleActions(actions, defaultState)
