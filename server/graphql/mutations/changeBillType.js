const {
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { BillType } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/bill_type')
const pick = require('lodash/pick')

const args = {
	id: { type: new GraphQLNonNull(GraphQLInt) },
	name: { type: GraphQLString },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args, type,
	resolve(parentValue, args) {
		let where = { id: args.id }
		let values = pick(args, ['name'])
		
		return getUser(args.token)
			.then(user => BillType.update(values, { where }))
			.then(() => BillType.findOne({ where }))
	}
}