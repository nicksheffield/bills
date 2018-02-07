const {
	GraphQLInt,
	GraphQLFloat,
	GraphQLString,
	GraphQLBoolean,
	GraphQLObjectType,
} = require('graphql')

module.exports = new GraphQLObjectType({
	name: 'Payment',
	fields: () => ({
		id: {
			type: GraphQLInt,
			resolve: x => x.id
		},
		amount: {
			type: GraphQLFloat,
			resolve: x => x.amount
		},
		paid: {
			type: GraphQLBoolean,
			resolve: x => x.paid
		},
		paid_at: {
			type: GraphQLString,
			resolve: x => x.paid_at
		},
		confirmed_at: {
			type: GraphQLString,
			resolve: x => x.confirmed_at
		},
		user: {
			type: require('./user'),
			resolve: x => x.getUser()
		},
		bill: {
			type: require('./bill'),
			resolve: x => x.getBill()
		},
	})
})