const {
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { BillType } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/bill_type')

const args = {
	id: { type: new GraphQLNonNull(GraphQLInt) },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args, type,
	resolve(parentValue, args) {
		return getUser(args.token)
			.then(user => BillType.destroy({ where: args }))
			.then(() => BillType.findOne({ where: args, paranoid: false }))
	}
}