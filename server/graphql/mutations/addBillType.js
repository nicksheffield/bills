const {
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { BillType } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/bill_type')

const args = {
	name: { type: new GraphQLNonNull(GraphQLString) },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args, type,
	resolve(parentValue, args) {
		return getUser(args.token)
			.then(user => BillType.create(args))
	}
}