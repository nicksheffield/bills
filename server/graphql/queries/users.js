const {
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLBoolean,
	GraphQLNonNull,
} = require('graphql')

const { models: { User } } = require('../../db')
const { getUser } = require('../../jwt')
const omit = require('lodash/omit')
const type = require('../types/user')

const args = {
	id: { type: GraphQLInt },
	active: { type: GraphQLBoolean },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args,
	type: new GraphQLList(type),
	resolve(parentValue, args) {
		return getUser(args.token)
			.then(user => User.findAll({ where: omit(args, ['token']) }))
	}
}
