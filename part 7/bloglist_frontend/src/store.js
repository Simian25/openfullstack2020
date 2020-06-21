import { createStore,combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'



import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

import thunk from 'redux-thunk'

const reducer = combineReducers({
  users:userReducer,
  user: loginReducer,
  notification: notificationReducer,
  blogs: blogReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store