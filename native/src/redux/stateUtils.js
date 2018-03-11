import { createAction } from 'redux-actions'
import {
	put as originalPut,
	takeLatest as originalTakeLatest
} from 'redux-saga/effects'

export const createAllActions = (name) => ({
	request: createAction(name + '-request'),
	success: createAction(name + '-success'),
	failure: createAction(name + '-failure'),
})

export const createMetaActions = (name) => ({
	loading: createAction(name + '-loading', () => ({ loading: true })),
	loaded: createAction(name + '-loaded', () => ({ loading: false })),
})

export const takeLatest = (actionCreator, fn) => originalTakeLatest(actionCreator().type, fn)

export const putAction = (actionCreator, payload) => originalPut(actionCreator(payload))

export const createLoader = () => {}