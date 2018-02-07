const {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { BillType } } = require('../../db')
const { getUser } = require('../../jwt')
const omit = require('lodash/omit')
const type = require('../types/bill_type')

const args = {
	id: { type: GraphQLInt },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args,
	type: new GraphQLList(type),
	resolve(parentValue, args) {
		return getUser(args.token)
		.then(() => BillType.findAll({ where: omit(args, ['token']) }))
	}
}