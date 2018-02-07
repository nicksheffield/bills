const {
	GraphQLInt,
	GraphQLList,
	GraphQLFloat,
	GraphQLString,
	GraphQLNonNull,
} = require('graphql')

const { models: { Bill, User, Payment } } = require('../../db')
const { getUser } = require('../../jwt')
const type = require('../types/bill')

const args = {
	billtype_id: { type: new GraphQLNonNull(GraphQLInt) },
	total_amount: { type: new GraphQLNonNull(GraphQLFloat) },
	date: { type: new GraphQLNonNull(GraphQLString) },
	user_ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
	token: { type: new GraphQLNonNull(GraphQLString) },
}

module.exports = {
	addBill: {
		args, type,
		resolve(parentValue, args) {
			const values = {
				total_amount: args.total_amount,
				date: args.date,
				bill_type_id: args.billtype_id
			}
			return getUser(args.token)
				.then(user => Bill.create(values))
				.then(bill => {
					return new Promise(resolve => {
						return Promise.all(args.user_ids.map(user_id => {
							return Payment.create({
								amount: args.total_amount / args.user_ids.length,
								user_id: user_id,
								bill_id: bill.id
							})
						})).then(() => resolve(bill))
					})
				})
		}
	}
}