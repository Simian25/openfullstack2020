import React,{useState} from 'react'

const BlogCreator =({createBlog})=>{
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')
   
    const addNewBlog =  (event)=>{
        event.preventDefault()
        const blogObject = {
          title:title,
          author:author,
          url:url, 
        }
       createBlog(blogObject)
       setTitle('')
       setAuthor('')
       setUrl('')
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
   
   return( <form onSubmit={addNewBlog}>
       <h2>Create New</h2>
       <p>title:<input type="text" value={title} onChange={handleTitleChange} name="title" /></p>
       <p>author:<input type="text"value={author} onChange={handleAuthorChange} name="author" /></p>
       <p>url:<input type="text" value={url} onChange={handleUrlChange} name="url" /></p>
        <button type='submit'>Create</button>

    </form>)
}

export default BlogCreator