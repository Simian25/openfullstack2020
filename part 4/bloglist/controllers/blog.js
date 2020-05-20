const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const blogHelper = require('../utils/blog_helper');


blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user',{username:1,name:1,id:1})
    response.json(blogs.map(b => b.toJSON()))
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
    const body = request.body
    let user;
    if (!body.title && !body.url) {
      response.status(400).end();
    } else {
      if(!body.user){
         const users = await User.find({});
         user = users[0];
      }else{
        user = User.findById(body.userId);
      }
      console.log(user);
      const blog = new Blog({
        ...body,
        user:user._id
      })
      const result = await blog.save();
      user.blogs = user.blogs.concat(result._id)
      await user.save();
      response.status(201).json(result.toJSON());
    }
  } catch (error) {
    next(error);
  }
});

  module.exports =  blogRouter