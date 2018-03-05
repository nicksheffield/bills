const {
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
	GraphQLBoolean,
} = require('graphql')

const { models: { Payment } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/payment')
const pick = require('lodash/pick')
const moment = require('moment')

const args = {
	id: { type: new GraphQLNonNull(GraphQLInt) },
	paid: { type: GraphQLBoolean },
	paid_at: { type: GraphQLString },
	confirmed_at: { type: GraphQLString },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args, type,
	resolve(parentValue, args) {
		let where = { id: args.id }
		let values = pick(args, ['paid', 'paid_at', 'confirmed_at'])

		return getUser(args.token)
			.then(user => Payment.update(values, { where }))
			.then(() => Payment.findOne({ where }))
	}
}