import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import loginService from './services/login'
import { LoginScreen,LogoutScreen } from './components/login'
import BlogList from './components/BlogList'
import BlogCreator from './components/BlogCreator'
import Notification from './components/Notification'
import Error from './components/ErrorNotification'
import ToggleAble from './components/ToggleAble'

import { useDispatch } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'
import { getBlogs } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [user,setUser] = useState(null)
  const [password,setPassword] = useState('')


  const blogCreateRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => { //easier to use then than async
    dispatch(getBlogs())
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  },[])

  const handleLogin =async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem( 'loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      dispatch(setNotification('Wrong username or password','error'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createBlog = async (bObj) => {
    blogCreateRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(bObj)
    returnedBlog.user = {
      name: user.name
    }
    dispatch(setNotification(`A new blog ${bObj.title} by ${bObj.author} has been added`,'message'))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 2000)
    setBlogs(blogs.concat(returnedBlog))
  }
  const updateBlog = (blog) => { //didnt use async as exercise
    blogService.like(blog).then(
      (updateBlog) => {
        updateBlog.user = {
          name: user.name
        }
        const updatedBlogs = blogs.filter(b => b.id !== blog.id)
          .concat(updateBlog)
          .sort((a, b) => b.likes - a.likes)
        setBlogs(updatedBlogs)
      })
  }
  const deleteBlog = async (blog) => {
    if(window.confirm('delete this blog?')){
      console.log(blog,' deleted')
      await blogService.deleteBlog(blog)
      const updatedBlogs = blogs
        .filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs)
      dispatch(setNotification(`deleted: The blog ${blog.title} by ${blog.author} has been deleted`,'message'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 2000)
    }

  }



  const loginForm = () => {
    return(
      <LoginScreen onSubmit={handleLogin} username={username} password={password} setUsername={({ target }) => setUsername(target.value)} setPassword={({ target }) => setPassword(target.value)} />
    )
  }
  const userLoggedIn = () => {
    return(
      <div>
        <h1>Blog app</h1>
        <LogoutScreen name={user.name} onClick ={handleLogout}/>
        <h2>blogs</h2>
        <ToggleAble buttonLabel="new blog" ref={blogCreateRef}>
          <BlogCreator createBlog={createBlog} />
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