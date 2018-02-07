const Conn = require('./connection')
const seed = require('./seed')

// models
const BillType = require('./models/bill_type')
const Bill = require('./models/bill')
const Payment = require('./models/payment')
const User = require('./models/user')

// relationships
const oneToMany = (a, b) => { a.hasMany(b); b.belongsTo(a) }

oneToMany(BillType, Bill)
oneToMany(Bill, Payment)
oneToMany(User, Payment)

// migrate & seed
// Conn.sync({ force: true }).then(seed)

module.exports = {
	connection: Conn,
	models: {
		BillType,
		Bill,
		Payment,
		User
	}
}