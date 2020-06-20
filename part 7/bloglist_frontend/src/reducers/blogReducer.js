/* eslint-disable no-case-declarations */
import blogService from '../services/blogService'
import { setNotification } from './notificationReducer'

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type:'INIT',
      data:{ blogs }
    })
  }
}
export const addBlog = (blog,user) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(blog)
    returnedBlog.user = user
    dispatch({
      type:'ADD',
      data:{ blog:returnedBlog }
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.like(blog)
    const id = blog.id
    dispatch({ type: 'LIKE',
      data: { id } })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    if(window.confirm('delete this blog?')){
      await blogService.deleteBlog(blog)
      const id = blog.id
      dispatch({ type:'DELETE',data:{ id } })
      dispatch(setNotification(`deleted: The blog ${blog.title} by ${blog.author} has been deleted`,'message'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 2000)
    }
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    state=action.data.blogs
    return state.sort((a,b) => b.likes-a.likes)
  case 'ADD':
    return [...state,action.data.blog]
  case 'LIKE':{
    const id = action.data.id
    const blogToChange = state.find(b => b.id===id)
    const changedBlog ={
      ...blogToChange
    }
    return state.map(blog => blog.id!==id ? blog:changedBlog).sort((a,b) => b.likes-a.likes)}
  case 'DELETE':
  {const id = action.data.id
    return state.filter(b => b.id !== id)}
  default:
    return state
  }
}

export default reducer