import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import loginService from './services/login' 
import {LoginScreen,LogoutScreen} from './components/login'
import BlogList from './components/BlogList'
import BlogCreator from './components/BlogCreator'
import {Error,Notification} from './components/Notification'
import ToggleAble from './components/ToggleAble'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [user,setUser] = useState(null)
  const [password,setPassword] = useState('')
  
  const [error,setError]=useState(null)
  const [message,setMessage] = useState(null)

  const blogCreateRef = React.createRef()
  
  useEffect(() => { //easier to use then than async
    blogService.getAll().then(blogs =>{
      blogs.sort((a,b)=>b.likes-a.likes)
      setBlogs( blogs )
    }
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

  const createBlog = async (bObj) =>{
    blogCreateRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(bObj)
    returnedBlog.user = {
      name: user.name
    }
       setMessage(`A new blog ${bObj.title} by ${bObj.author} has been added`)
       setTimeout(() => {
         setMessage(null);
       }, 2000);
       setBlogs(blogs.concat(returnedBlog))
  }
  const updateBlog = (blog)=>{ //didnt use async as exercise
    blogService.like(blog).then(
      (updateBlog)=>{
        updateBlog.user = {
          name: user.name
        }
        const updatedBlogs = blogs
        .filter(b => b.id !== blog.id)
        .concat(updateBlog)
        .sort((a, b) => b.likes - a.likes);
  
      setBlogs(updatedBlogs);
    })
    
  }
  const deleteBlog = async (blog)=>{
    if(window.confirm("delete this blog?")){
      console.log(blog," deleted")
     await blogService.deleteBlog(blog)
     const updatedBlogs = blogs
        .filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs)
    }

  }



  const loginForm = ()=>{
    
    return(
    <LoginScreen onSubmit={handleLogin} username={username} password={password} setUsername={({target})=>setUsername(target.value)} setPassword={({target})=>setPassword(target.value)} />
    )
  }
  const userLoggedIn = ()=>{
    return(
      <div>
        
      <LogoutScreen name={user.name} onClick ={handleLogout}/>
      <h2>blogs</h2>
      <ToggleAble buttonLabel="new blog" ref={blogCreateRef}>
      <BlogCreator createBlog={createBlog} />
      </ToggleAble>
      <BlogList blogs={blogs} updateHandler={updateBlog} deleteHandler={deleteBlog}/>
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