const {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLBoolean,
	GraphQLNonNull,
} = require('graphql')

const { models: { Bill } } = require('../../db')
const { getUser } = require('../../jwt')
const omit = require('lodash/omit')
const type = require('../types/bill')

const args = {
	id: { type: GraphQLInt },
	paid: { type: GraphQLBoolean },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args,
	type: new GraphQLList(type),
	resolve(parentValue, args) {
		return getUser(args.token)
			.then(() => Bill.findAll({ where: omit(args, ['token']) }))
	}
}
