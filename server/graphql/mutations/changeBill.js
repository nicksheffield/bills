const {
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { Bill } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/bill')
const pick = require('lodash/pick')

const args = {
	id: { type: new GraphQLNonNull(GraphQLInt) },
	amount: { type: GraphQLString },
	billtype_id: { type: GraphQLInt },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args, type,
	resolve(parentValue, args) {
		let where = { id: args.id }
		let values = pick(args, ['name'])
		if (args.billtype_id) {
			values.bill_type_id = args.billtype_id
		}
		return getUser(args.token)
			.then(user => BillType.update(values, { where }))
			.then(() => BillType.findOne({ where }))
	}
}