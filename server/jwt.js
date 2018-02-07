const jwt = require('jsonwebtoken')
const { models: { User } } = require('./db')

const secret = 'nVFXYCDsrxW7P5BBHdTuBtcj'

module.exports = {
	create:  payload => jwt.sign(payload, secret),
	verify:  token   => jwt.verify(token, secret),
	decode:  token   => jwt.decode(token),
	getUser: token   => {
		return new Promise((resolve, reject) => {
			if (jwt.verify(token, secret)) {
				let user = User.findOne({ where: { id: jwt.decode(token).id } })

				resolve(user)
			} else {
				reject(new Error('Token cannot be verified'))
			}
		})
	}
}