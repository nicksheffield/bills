const {
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { User } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/user')
const pick = require('lodash/pick')
const bcrypt = require('bcrypt')

const args = {
	id: { type: new GraphQLNonNull(GraphQLInt) },
	name: { type: GraphQLString },
	email: { type: GraphQLString },
	password: { type: GraphQLString },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args, type,
	resolve(parentValue, args) {
		let where = { id: args.id }
		let values = pick(args, ['name', 'email'])
		if (args.password) {
			values.password = bcrypt.hashSync(args.password, 10)
		}
		return getUser(args.token)
			.then(user => User.update(values, { where }))
			.then(() => User.findOne({ where }))
	}
}