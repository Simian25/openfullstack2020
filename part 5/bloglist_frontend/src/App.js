import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import loginService from './services/login' 
import {LoginScreen,LogoutScreen} from './components/login'
import BlogFinder from './components/BlogFinder'
import BlogCreator from './components/BlogCreator'
import {Error,Notification} from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [user,setUser] = useState(null)
  const [password,setPassword] = useState('')
  const [filteredBlogs,setFilteredBlogs] = useState([]);
  
  const [error,setError]=useState(null)
  const [message,setMessage] = useState(null)

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')



  const handleLogin =async (event)=>{
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
    setFilteredBlogs(blogs.filter((blog)=>blog.user!==undefined)
      .filter((blog)=>blog.user.username===user.username))
    } catch (err) {
      setError('Wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }
  const handleLogout = (event)=>{
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(()=>{
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      blogService.setToken(user.token)
      setUser(user)
      setFilteredBlogs(blogs.filter((blog)=>blog.user!==undefined)
      .filter((blog)=>blog.user.username===user.username))
    }
  },[blogs])
  const loginForm = ()=>{
    return(<LoginScreen onSubmit={handleLogin} username={username} password={password} setUsername={({target})=>setUsername(target.value)} setPassword={({target})=>setPassword(target.value)} />
    )
  }
  const userLoggedIn = ()=>{
    return(
      <div>
      <LogoutScreen name={user.name} onClick ={handleLogout}/>
      <h2>blogs</h2>
      <BlogCreator onSubmit={addNewBlog} title={title} author={author} url={url} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />
      <BlogFinder blogs={filteredBlogs}/>
      </div>
    )
  }
  
  const handleTitleChange = (event)=>{
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event)=>{
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event)=>{
    setUrl(event.target.value)
  }

  const addNewBlog = async (event)=>{
    event.preventDefault()
    const blogObject = {
      title:title,
      author:author,
      url:url, 
    }
    const returnedBlog = await blogService.create(blogObject)
    setMessage(`A new blog ${title} by ${author} has been added`)
    setTimeout(() => {
      setMessage(null);
    }, 2000);
    setFilteredBlogs(filteredBlogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    
  }

  return (
    <div>
      <Error message={error}/>
      <Notification message={message}/>
      {user === null ? loginForm():userLoggedIn()}
      
    </div>
  )
}

export default App