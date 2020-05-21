import React from 'react'
import Blog from './Blog'


const BlogFinder = ({blogs}) =>{
    return(blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      ))
}


export default BlogFinder