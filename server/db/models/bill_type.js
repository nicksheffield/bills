const Sequelize = require('sequelize')
const Conn = require('../connection')

module.exports = Conn.define('bill_type', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	default_amount: {
		type: Sequelize.FLOAT,
		allowNull: true
	},
	icon: {
		type: Sequelize.STRING,
		allowNull: true
	}
}, {
	paranoid: true,
	underscored: true
})
