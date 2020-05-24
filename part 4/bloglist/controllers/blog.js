const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const blogHelper = require('../utils/blog_helper');
const jwt =require('jsonwebtoken')


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
   const blog = await Blog.findById(request.params.id)
   const token = request.token
   const decodedToken = jwt.verify(token,process.env.SECRET)
   if (!token || !decodedToken.id) {
     return response.status(401).json({
       error: 'token missing or invalid'
     })
   }
   const user = await User.findById(decodedToken.id)
   if(blog.user.toString()===user.id.toString()){
      blog.remove()
   }
   response.status(204).end();
  }catch(err){
    next(err)
  }

})


blogRouter.put('/:id', async (request, res, next) => {
  try {
    const body = request.body
    const dataToUpdate = {
      likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      dataToUpdate,
      { new: true },
    );
    res.json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
  });
blogRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token,process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
    const user = await User.findById(decodedToken.id)
    if (!body.title && !body.url) {
      response.status(400).end();
    } else {
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