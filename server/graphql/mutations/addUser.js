const {
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { User } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/user')
const bcrypt = require('bcrypt')

const args = {
	name: { type: new GraphQLNonNull(GraphQLString) },
	email: { type: new GraphQLNonNull(GraphQLString) },
	password: { type: new GraphQLNonNull(GraphQLString) },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	addUser: {
		args, type,
		resolve(parentValue, args) {
			let password = bcrypt.hashSync(args.password, 10)
			return getUser(args.token)
				.then(user => User.create(Object.assign({}, args, { password })))
		}
	}
}