const Sequelize = require('sequelize')

const host             = '127.0.0.1'
const user             = 'root'
const pass             = ''
const db               = 'bills'
const dialect          = 'mysql'
const logging          = false
const operatorsAliases = false

module.exports = new Sequelize(db, user, pass, {
	host, dialect, logging, operatorsAliases,
})