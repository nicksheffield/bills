import { find } from 'utils/funcs'

export const newState = (state, action, ...cases) => {
	const freshState = {...state}
	const actionCase = find(cases, x => x[0] === action.type)
	return actionCase ? actionCase[1](freshState, action) : freshState
}
