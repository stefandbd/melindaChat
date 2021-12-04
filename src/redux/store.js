import AppReducer from './index'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
const reduxStore = createStore(AppReducer, applyMiddleware(thunk))

export default reduxStore
