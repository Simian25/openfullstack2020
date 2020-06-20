import React, { useEffect } from 'react'
import LoginScreen from './components/LoginScreen'
import LogoutScreen from './components/LogoutScreen'
import BlogList from './components/BlogList'
import BlogCreator from './components/BlogCreator'
import Notification from './components/Notification'
import Error from './components/ErrorNotification'
import ToggleAble from './components/ToggleAble'

import { useDispatch } from 'react-redux'

import { getBlogs } from './reducers/blogReducer'
import { checkUser } from './reducers/userReducer'

import { useSelector } from 'react-redux'

const App = () => {

  const user = useSelector(state => state.user)

  const blogCreateRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkUser())
  },[dispatch])



  const toggleVisibility = () => {
    blogCreateRef.current.toggleVisibility()
  }



  const loginForm = () => {
    return(
      <LoginScreen/>
    )
  }
  const userLoggedIn = () => {
    return(
      <div>
        <h1>Blog app</h1>
        <LogoutScreen/>
        <h2>blogs</h2>
        <ToggleAble buttonLabel="new blog" ref={blogCreateRef}>
          <BlogCreator toggleVisibility={toggleVisibility} />
        </ToggleAble>
        <div id='blogs'>
          <BlogList/>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Error/>
      <Notification/>
      {user === null ? loginForm():userLoggedIn()}
    </div>
  )
}

export default App