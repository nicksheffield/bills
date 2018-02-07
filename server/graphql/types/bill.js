const {
	GraphQLObjectType,
	GraphQLBoolean,
	GraphQLString,
	GraphQLFloat,
	GraphQLList,
	GraphQLInt,
} = require('graphql')

module.exports = new GraphQLObjectType({
	name: 'Bill',
	fields: () => ({
		id: {
			type: GraphQLInt,
			resolve: x => x.id
		},
		total_amount: {
			type: GraphQLFloat,
			resolve: x => x.total_amount
		},
		date: {
			type: GraphQLString,
			resolve: x => x.date
		},
		created_at: {
			type: GraphQLString,
			resolve: x => x.created_at
		},
		updated_at: {
			type: GraphQLString,
			resolve: x => x.updated_at
		},
		deleted_at: {
			type: GraphQLString,
			resolve: x => x.deleted_at
		},
		billtype: {
			type: require('./bill_type'),
			resolve: x => x.getBill_type()
		},
		payments: {
			type: new GraphQLList(require('./payment')),
			args: {
				paid: { type: GraphQLBoolean }
			},
			resolve: (x, args) => x.getPayments({ where: args })
		},
	})
})