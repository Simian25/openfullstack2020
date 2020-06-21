//react
import React,{ useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link,Redirect,useRouteMatch
} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'


//home
import LoginScreen from './components/LoginScreen'
import LogoutScreen from './components/LogoutScreen'
import BlogList from './components/BlogList'
import BlogCreator from './components/BlogCreator'
import Notification from './components/Notification'
import Error from './components/ErrorNotification'
import ToggleAble from './components/ToggleAble'

import UserList from './components/UserList'
import User from './components/User'
//reducers
import { getBlogs } from './reducers/blogReducer'
import { checkUser } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'


const Home = () => {

  const blogCreateRef = React.createRef()

  const toggleVisibility = () => {
    blogCreateRef.current.toggleVisibility()
  }
  return (
    <div>
      <ToggleAble buttonLabel="new blog" ref={blogCreateRef}>
        <BlogCreator toggleVisibility={toggleVisibility} />
      </ToggleAble>
      <div id='blogs'>
        <BlogList/>
      </div>
    </div>
  )
}




const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(checkUser())
    dispatch(getUsers())
  }, [dispatch])

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const userText = match ? users.find(user => user._id === match.params.id)   : null
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
      {user? <div><Error/>
        <Notification/>
        <h1>Blog app</h1>
        <LogoutScreen/></div>:null}
      <Switch>
        <Route path="/login">
          <LoginScreen/>
        </Route>
        <Route path='/users/:id'>
          <User user={userText}/>
        </Route>
        <Route path="/users">
          {user ? (users?<UserList/>:<p>No users yet</p>) : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          {user? <Home />: <Redirect to = '/login'/> }
        </Route>
      </Switch>
    </Router>
  )
}
export default App