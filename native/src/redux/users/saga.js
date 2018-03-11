import { all, call } from 'redux-saga/effects'
import { takeLatest, putAction } from '../stateUtils'
import config from '../../config'
import { api, handleError } from '../../utils'

import { actions } from './reducer'

export default function*() {
	yield all([
		takeLatest(actions.load.request, loadUsers)
	])
}

function* loadUsers() {
	try {
		yield putAction(actions.meta.loading)

		let response = yield call(api.post, config.apiBaseUrl, {
			query: `
				query {
					users {
						id
						name
					}
				}
			`
		})
		
		let users = response.data.data.users

		yield putAction(actions.load.success, users)
		yield putAction(actions.meta.loaded)
	} catch(error) {
		yield putAction(actions.load.failure, error)
		yield putAction(actions.meta.loaded)

		handleError(error)
	}
}