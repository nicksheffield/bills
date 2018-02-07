const {
	GraphQLObjectType,
	GraphQLString,
} = require('graphql')

const { models: { User } } = require('../../db')
const jwt = require('../../jwt')

module.exports = new GraphQLObjectType({
	name: 'Token',
	fields: () => ({
		token: {
			type: GraphQLString,
			resolve: x => x
		},
		user: {
			type: require('./user'),
			resolve: x => jwt.getUser(x)
		}
	})
})