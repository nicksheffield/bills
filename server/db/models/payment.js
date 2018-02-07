const Sequelize = require('sequelize')
const Conn = require('../connection')

module.exports = Conn.define('payment', {
	amount: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	paid: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	paid_at: {
		type: Sequelize.DATE,
		allowNull: true
	},
	confirmed_at: {
		type: Sequelize.DATE,
		allowNull: true
	}
}, {
	paranoid: true,
	underscored: true
})
