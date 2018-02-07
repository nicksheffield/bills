const times = require('lodash/times')
const random = require('lodash/random')
const Faker = require('faker')
const bcrypt = require('bcrypt')

const BillType = require('./models/bill_type')
const Bill = require('./models/bill')
const Payment = require('./models/payment')
const User = require('./models/user')

const series = arr => arr.slice(1).reduce((s,x) => s.then(x), arr[0])

module.exports = () => {
	// make all users
	const users = () => {
		return series([
			User.create({ name: 'Nick',  email: 'nick@gmail.com',  password: bcrypt.hashSync('abcd', 10), admin: true }),
			User.create({ name: 'Jacob', email: 'jacob@gmail.com', password: bcrypt.hashSync('abcd', 10) }),
			User.create({ name: 'Paige', email: 'paige@gmail.com', password: bcrypt.hashSync('abcd', 10) }),
			User.create({ name: 'Gavin', email: 'gavin@gmail.com', password: bcrypt.hashSync('abcd', 10) }),
		])
	}

	// make all bill types
	const bill_types = () => {
		return series([
			BillType.create({ name: 'Electricity', icon: 'bolt' }),
			BillType.create({ name: 'Water',       icon: 'tint' }),
			BillType.create({ name: 'Internet',    icon: 'globe',      default_amount: 93.95 }),
			BillType.create({ name: 'Rent',        icon: 'home',       default_amount: 775 }),
			BillType.create({ name: 'Netflix',     icon: 'television', default_amount: 19.78 }),
		])
	}

	users().then(
		() => bill_types(),
		err => console.log('error', err)
	)

}
