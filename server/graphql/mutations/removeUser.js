const {
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { User } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/user')

const args = {
	id: { type: new GraphQLNonNull(GraphQLInt) },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args, type,
	resolve(parentValue, args) {
		return getUser(args.token)
			.then(user => User.destroy({ where: args }))
			.then(() => User.findOne({ where: args, paranoid: false }))
	}
}