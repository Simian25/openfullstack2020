import React from 'react'

const BlogCreator =({onSubmit,title,author,url,handleTitleChange,handleAuthorChange,handleUrlChange})=>{
   return( <form onSubmit={onSubmit}>
       <h2>Create New</h2>
       <p>title:<input type="text" value={title} onChange={handleTitleChange} name="title" /></p>
       <p>author:<input type="text"value={author} onChange={handleAuthorChange} name="author" /></p>
       <p>url:<input type="text" value={url} onChange={handleUrlChange} name="url" /></p>
        <button type='submit'>Create</button>

    </form>)
}

export default BlogCreator