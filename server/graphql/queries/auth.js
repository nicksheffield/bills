const {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { User } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/user')

const args = {
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args, type,
	resolve(parentValue, args) {
		return getUser(args.token).then(user => user)
	}
}
