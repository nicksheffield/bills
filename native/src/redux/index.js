import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import { reducer as usersReducer, saga as usersSaga } from './users'
import { reducer as authReducer, saga as authSaga } from './auth'
import { default as routingReducer } from './routing'
import { default as metaReducer } from './meta'

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware, createLogger({ collapsed: true }))

const reducer = combineReducers({
	routing: routingReducer,
	users: usersReducer,
	auth: authReducer,
	meta: metaReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducer, composeEnhancers(middleware))

sagaMiddleware.run(usersSaga)
sagaMiddleware.run(authSaga)
