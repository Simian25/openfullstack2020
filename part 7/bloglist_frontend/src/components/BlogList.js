import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    blogs.map(blog =>
      <div style={blogStyle} key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <br/>
      </div>
    ))
}
const mapStateToProps = (state) => {
  return{
    blogs:state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)