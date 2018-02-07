const {
	GraphQLBoolean,
	GraphQLList,
	GraphQLInt
} = require('graphql')

const { models: { Payment } } = require('../../db')
const type = require('../types/payment')

const args = {
	id: { type: GraphQLInt },
	paid: { type: GraphQLBoolean }
}

module.exports = {
	args,
	type: new GraphQLList(type),
	resolve(parentValue, args) {
		return Payment.findAll({ where: args })
	}
}