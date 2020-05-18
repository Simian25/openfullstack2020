const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const blogHelper = require('../utils/blog_helper');


blogRouter.get('/', async (request, response, next) => {
  try {
    response.json(await blogHelper.blogsInDb());
  } catch (err) {
    next(err);
  }
});
blogRouter.delete('/:id',async (request,response,next)=>{
  try{
   await Blog.findByIdAndRemove(request.params.id)
   response.status(204).end();
  }catch(err){
    next(err)
  }

})
blogRouter.put('/:id',async (request,response,next)=>{
  try{
    const {
      title, author, url, likes,
    } = request.body;

    if (!title && !author && !url && !likes) {
      res.status(400).end();
      return;
    }
    if(!title || (!author &&!url)){
      const blogs = await blogHelper.blogsInDb();
      const blog = blogs.find(originalBlog => originalBlog.id === request.params.id);
      blog.likes= likes;
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true })
      response.json(updatedBlog.toJSON());
    }else{
      const blog = new Blog(request.body);
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true })
      response.json(updatedBlog.toJSON());
    }
  
  }catch(err){
    next(err)
  }
})  
blogRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    if (!blog.title && !blog.url) {
      response.status(400).end();
    } else {
      const result = await blog.save();
      response.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }
});

  module.exports =  blogRouter