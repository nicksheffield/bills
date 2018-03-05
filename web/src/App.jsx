import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NoRoute from 'screens/NoRoute'
import store from 'state'
import config from 'config'
import { RESTORE } from 'state/user'
import { routes } from 'config/routes'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
	link: new HttpLink({ uri: config.api }),
	cache: new InMemoryCache()
})

store.dispatch({ type: RESTORE })

export default () => (
	<ApolloProvider client={client}>
		<Provider store={store}>
			<Router>
				<Switch>
					{routes.map((route, i) => (
						<Route key={i} exact path={route.url} component={route.component} {...route.extras} />
					))}
					<Route component={NoRoute} />
				</Switch>
			</Router>
		</Provider>
	</ApolloProvider>
)
