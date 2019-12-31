import { createStore, applyMiddleware } from 'redux'

import promise from 'redux-promise-middleware'

import reducers from './reducers'

const middlewares = applyMiddleware(promise)

const store = createStore(reducers, middlewares)

export default store
