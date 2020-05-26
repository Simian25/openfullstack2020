import React from 'react'
import Blog from './Blog'


const BlogList = ({ blogs,updateHandler,deleteHandler }) => {
  return(
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} updateHandler={updateHandler} deleteHandler={deleteHandler}/>
    ))
}


export default BlogList