const Sequelize = require('sequelize')
const Conn = require('../connection')

module.exports = Conn.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	active: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	admin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
}, {
	paranoid: true,
	underscored: true
})
