const {
	GraphQLObjectType,
	GraphQLBoolean,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
} = require('graphql')

module.exports = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: {
			type: GraphQLInt,
			resolve: x => x.id
		},
		name: {
			type: GraphQLString,
			resolve: x => x.name
		},
		email: {
			type: GraphQLString,
			resolve: x => x.email
		},
		admin: {
			type: GraphQLBoolean,
			resolve: x => x.admin
		},
		active: {
			type: GraphQLBoolean,
			resolve: x => x.active
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