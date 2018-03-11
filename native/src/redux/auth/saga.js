// @flow
import { all, call } from 'redux-saga/effects'
import { takeLatest, putAction } from '../stateUtils'
import config from '../../config'
import { api, handleError } from '../../utils'

import { actions } from './reducer'

export default function*() {
	yield all([
		takeLatest(actions.login.request, getToken)
	])
}

function* getToken({ payload }) {
	try {
		yield putAction(actions.meta.loading)

		let response = yield call(api.post, config.apiBaseUrl, {
			query: `
				mutation($email: String!, $password: String!) {
					login(email: $email, password: $password) {
						token
						user {
							id, name, email, admin, active
						}
					}
				}
			`,
			variables: payload
		})
		
		let token = response.data.login.token

		yield putAction(actions.login.success, token)
		yield putAction(actions.meta.loaded)
	} catch(error) {
		yield putAction(actions.login.failure, error)
		yield putAction(actions.meta.loaded)

		handleError(error)
	}
}