// Make sure you've got your ducks in a row
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { reducer as userReducer, saga as userSaga } from 'state/user'

const rootReducer = combineReducers({
	user: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()
const middleware     = applyMiddleware(sagaMiddleware)
const appStore       = createStore(rootReducer, composeEnhancers(middleware))

sagaMiddleware.run(userSaga)

export default appStore
