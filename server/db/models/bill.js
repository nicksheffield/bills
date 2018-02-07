const Sequelize = require('sequelize')
const Conn = require('../connection')

module.exports = Conn.define('bill', {
	total_amount: {
		type: Sequelize.FLOAT,
		allowNull: true
	},
	date: {
		type: Sequelize.DATE,
		allowNull: true
	},
	paid: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	paid_at: {
		type: Sequelize.DATE,
		allowNull: true
	}
}, {
	paranoid: true,
	underscored: true
})
