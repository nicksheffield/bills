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

		// values.paid_at = moment(values.paid_at).format('YYYY-MM-DD')
		// values.confirmed_at = moment(values.confirmed_at).format('YYYY-MM-DD')
		
		console.log('values', values)

		return getUser(args.token)
			.then(user => Payment.update(values, { where }))
			.then(() => Payment.findOne({ where }))
	}
}