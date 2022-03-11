import AppReducer from './index'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxStore = createStore(AppReducer, composeEnhancers(applyMiddleware(thunk)))

export default reduxStore
