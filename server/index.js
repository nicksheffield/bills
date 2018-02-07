const express = require('express')
const expressGraphQL = require('express-graphql')
const cors = require('cors')
const schema = require('./graphql')
const app = express()

app.use(cors())

app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
}))

app.listen(4000, () => {
	console.log('server is running on http://localhost:4000')
	console.log(new Date())
})
