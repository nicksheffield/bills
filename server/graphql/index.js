const {
	GraphQLSchema,
	GraphQLObjectType,
} = require('graphql')

const queries = {
	users:     require('./queries/users'),
	bills:     require('./queries/bills'),
	payments:  require('./queries/payments'),
	billtypes: require('./queries/bill_types'),
	auth:      require('./queries/auth'),
}

const mutations = {
	...require('./mutations/addUser'),
	changeUser:     require('./mutations/changeUser'),
	removeUser:     require('./mutations/removeUser'),

	addBillType:    require('./mutations/addBillType'),
	changeBillType: require('./mutations/changeBillType'),
	removeBillType: require('./mutations/removeBillType'),

	...require('./mutations/addBill'),
	changeBill:     require('./mutations/changeBill'),
	removeBill:     require('./mutations/removeBill'),

	changePayment:  require('./mutations/changePayment'),
	
	login:          require('./mutations/login'),
}

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: queries
	}),
	mutation: new GraphQLObjectType({
		name: 'RootMutationType',
		fields: mutations
	})
})
