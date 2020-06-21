import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'


const BlogList = ({ blogs }) => {
  return(
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog}/>
    ))
}
const mapStateToProps = (state) => {
  return{
    blogs:state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)