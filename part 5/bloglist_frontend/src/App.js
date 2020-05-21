import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import loginService from './services/login' 
import {LoginScreen,LogoutScreen} from './components/login'
import BlogList from './components/BlogList'
import BlogCreator from './components/BlogCreator'
import {Error,Notification} from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [user,setUser] = useState(null)
  const [password,setPassword] = useState('')
  
  const [error,setError]=useState(null)
  const [message,setMessage] = useState(null)

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  const  [loginVisible,setLoginVisible]= useState(false)
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
    }
  },[])

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
    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    
  }



  const loginForm = ()=>{
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return(
    <>
    <div style={hideWhenVisible}>
    <button onClick={() => setLoginVisible(true)}>log in</button>
    </div>
    <div style={showWhenVisible}>
    <LoginScreen onSubmit={handleLogin} username={username} password={password} setUsername={({target})=>setUsername(target.value)} setPassword={({target})=>setPassword(target.value)} />
    <button onClick={() => setLoginVisible(false)}>cancel</button>
    </div>
    </>
    )
  }
  const userLoggedIn = ()=>{
    
    return(
      <div>
        
      <LogoutScreen name={user.name} onClick ={handleLogout}/>
      <h2>blogs</h2>
      <BlogCreator onSubmit={addNewBlog} title={title} author={author} url={url} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />
      <BlogList blogs={blogs}/>
      </div>
    )
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