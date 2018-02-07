const {
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { Bill, Payment } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/bill')

const args = {
	id: { type: new GraphQLNonNull(GraphQLInt) },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args, type,
	resolve(parentValue, args) {
		return getUser(args.token)
			.then(user => Payment.destroy({ where: { bill_id: args.id } }))
			.then(() => Bill.destroy({ where: args }))
			.then(() => Bill.findOne({ where: args, paranoid: false }))
	}
}