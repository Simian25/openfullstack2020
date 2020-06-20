import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import {setNotification} from '../reducers/notificationReducer'

const BlogCreator =({ toggleVisibility }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const addNewBlog =  (event) => {
    event.preventDefault()
    const blogObject = {
      title:event.target.title.value,
      author:event.target.author.value,
      url:event.target.url.value
    }
    toggleVisibility()
    dispatch(addBlog(blogObject,user))
    dispatch(setNotification(`A new blog ${blogObject.title} by ${blogObject.author} has been added`,'message'))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 2000)
    event.target.title.value=''
    event.target.author.value=''
    event.target.url.value=''
  }

  return(
    <div className='formDiv'>
      <form onSubmit={addNewBlog}>
        <h2>Create New</h2>
        <p>title:<input type="text" id='title' name="title" /></p>
        <p>author:<input id='author' type="text" name="author" /></p>
        <p>url:<input type="text" id='url' name="url" /></p>
        <button id='submitButton' type='submit'>Create</button>

      </form>
    </div>
  )
}

export default BlogCreator