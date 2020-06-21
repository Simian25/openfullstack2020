import React from 'react'
import { likeBlog,deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  setNotification
}

const Blog = ({ blog,likeBlog,deleteBlog }) => {
  console.log('test')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const like = (blog) => {
    likeBlog(blog)
  }
  const deleteB = (blog) => {
    deleteBlog(blog)
  }
  if(blog){
    return (
      <div style={blogStyle}>
        <div className='blog'>
          {blog.title} - {blog.author}
          <a href={blog.url}>{blog.url}</a>
          <br />
          {blog.likes} likes
          <button onClick={() => like(blog)}>like</button>
          <br />
          {blog.user.name}
          <br />
          <button onClick={() => deleteB(blog)}>delete</button>
        </div>
      </div>
    )
  }

  return null
}

export default connect(null,mapDispatchToProps)(Blog)
