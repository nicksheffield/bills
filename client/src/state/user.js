import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import config from 'config'
import swal from 'sweetalert2'

export const LOGIN_REQUEST   = 'bills/user/LOGIN_REQUEST'
export const LOGIN_SUCCESS   = 'bills/user/LOGIN_SUCCESS'
export const LOGIN_FAILURE   = 'bills/user/LOGIN_FAILURE'
export const LOGOUT          = 'bills/user/LOGOUT'
export const LOGOUT_SUCCESS  = 'bills/user/LOGOUT_SUCCESS'
export const RESTORE         = 'bills/user/RESTORE'
export const RESTORE_SUCCESS = 'bills/user/RESTORE_SUCCESS'
export const RESTORE_FAILURE = 'bills/user/RESTORE_FAILURE'

export const reducer = (state = {}, action = {}) => {
	state = {...{
		loading: false,
		loggedIn: false,
		user: null,
		token: ''
	}, ...state}

	switch (action.type) {
		case LOGIN_REQUEST:
			state.loading = true
			return state
		case LOGIN_SUCCESS:
			state.loading = false
			state.loggedIn = true
			state.user = action.payload.user
			state.token = action.payload.token
			return state
		case LOGIN_FAILURE:
			state.loading = false
			return state

		case LOGOUT:
			state.loading = false
			state.loggedIn = false
			state.user = null
			return state

		case RESTORE:
			state.loading = true
			return state
		case RESTORE_SUCCESS:
			state.loading = false
			state.loggedIn = true
			state.user = action.payload.user
			state.token = action.payload.token
			return state
		case RESTORE_FAILURE:
			state.loading = false
			state.loggedIn = false
			return state

		default:
			return state
	}
}

export function* saga() {
	yield all([
		_login(),
		_logout(),
		_restore(),
	])
}

function* _login() {
	yield takeLatest(LOGIN_REQUEST, login)
}

function* login({ payload }) {
	try {
		const response = yield call(axios.post, config.api, {
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

		if (response.data.errors) {
			throw response.data.errors[0].message
		}

		const { token, user } = response.data.data.login
	
		localStorage.setItem('token', token)
	
		yield put({
			type: LOGIN_SUCCESS,
			payload: { user, token }
		})
	} catch(err) {
		yield put({ type: LOGIN_FAILURE, payload: { error: err } })
		swal('Oops...', err, 'error')
	}
}

function* _restore() {
	yield takeLatest(RESTORE, restore)
}

function* restore() {
	const token = localStorage.getItem('token')

	if (token) {
		const response = yield call(axios.post, config.api, {
			query: `
				query($token: String!) {
					auth(token: $token) {
						id, name, email, admin, active
					}
				}
			`,
			variables: { token }
		})

		const { auth } = response.data.data

		yield put({ type: RESTORE_SUCCESS, payload: { user: auth, token } })
	} else {
		yield put({ type: RESTORE_FAILURE })
	}
}

function* _logout() {
	yield takeLatest(LOGOUT, logout)
}

function* logout() {
	localStorage.removeItem('token')
	yield put({ type: LOGOUT_SUCCESS })
}