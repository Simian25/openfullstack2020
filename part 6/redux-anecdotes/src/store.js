import { createStore,combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import timeReducer from './reducers/timeReducer'

import thunk from 'redux-thunk'

const reducer = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  time: timeReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store