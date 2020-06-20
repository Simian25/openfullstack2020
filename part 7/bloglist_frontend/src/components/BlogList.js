import React from 'react'
import Blog from './Blog'
import {connect} from 'react-redux'


const BlogList = ({ blogs,updateHandler,deleteHandler }) => {
  return(
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} updateHandler={updateHandler} deleteHandler={deleteHandler}/>
    ))
}
const mapStateToProps = (state) => {
  return{
    blogs:state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)