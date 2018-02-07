const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat,
	GraphQLList
} = require('graphql')

module.exports = new GraphQLObjectType({
	name: 'BillType',
	fields: () => ({
		id: {
			type: GraphQLInt,
			resolve: x => x.id
		},
		name: {
			type: GraphQLString,
			resolve: x => x.name
		},
		default_amount: {
			type: GraphQLFloat,
			resolve: x => x.default_amount
		},
		icon: {
			type: GraphQLString,
			resolve: x => x.icon
		},
		bills: {
			type: new GraphQLList(require('./bill')),
			resolve: x => x.getBills()
		},
	})
})