const {
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { User } } = require('../../db')
const type = require('../types/token')
const jwt = require('../../jwt')
const bcrypt = require('bcrypt')

const args = {
	email: { type: new GraphQLNonNull(GraphQLString) },
	password: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	args, type,
	resolve(parentValue, args) {
		return User.findOne({ where: { email: args.email } })
			.then(user => {
				if (!user) {
					throw new Error('Incorrect email address')
				}
				return new Promise((resolve, reject) => {
					bcrypt.compare(args.password, user.password, function(err, res) {
						if (!res) return reject(new Error('Incorrect password'))
						
						resolve(jwt.create({
							id: user.id,
							email: user.email,
							admin: user.admin,
							active: user.active,
						}))
					})
				})
			})
	}
}
