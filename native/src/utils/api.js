import config from '../config'

// Utils
// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
const handleResponse = res => {
	if (!res.ok) {
		if (res.headers.map['content-type'][0].indexOf('application/json') !== -1) {
			return res.json().then(error => {
				throw error
			})
		} else {
			return res.text().then(error => {
				console.log('Non-JSON error', error, res)
				throw Error('Unknown server error')
			})
		}
	}
	if (res.status === 204) {
		return null
	}
	return res.json()
}

const urlEncode = (data) => {
	let formBody = []
	let e = encodeURIComponent

	for (let property in data) {
		formBody.push(`${e(property)}=${e(data[property])}`)
	}

	return formBody.join("&")
}

const jsonEncode = (data) => JSON.stringify(data)

const PostData = {
	'Accept': 'application/json',
	'Content-Type': 'application/x-www-form-urlencoded'
}

const JsonData = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

export default {
	get: (path) => {
		return fetch(path.indexOf('http') === -1 ? config.apiBaseUrl + path : path, {
			method: 'GET',
		}).then(handleResponse)
	},
	
	post: (path, payload) => {
		return fetch(path.indexOf('http') === -1 ? config.apiBaseUrl + path : path, {
			method: 'POST',
			headers: { ...JsonData },
			body: jsonEncode(payload)
		}).then(handleResponse)
	},

	put: (path, payload) => {
		return fetch(path.indexOf('http') === -1 ? config.apiBaseUrl + path : path, {
			method: 'PUT',
			headers: { ...JsonData },
			body: jsonEncode(payload)
		}).then(handleResponse)
	},

	destroy: (path) => {
		return fetch(path.indexOf('http') === -1 ? config.apiBaseUrl + path : path, {
			method: 'DELETE',
		}).then(handleResponse)
	}
}