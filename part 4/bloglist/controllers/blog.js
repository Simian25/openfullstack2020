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