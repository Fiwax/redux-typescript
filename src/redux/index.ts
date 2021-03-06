import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middleware = [thunk]
const initialState = {}

const composeFunc = composeWithDevTools
const composedEnchanters = composeFunc(applyMiddleware(...middleware))
const store = createStore(rootReducer, initialState, composedEnchanters)

export default store