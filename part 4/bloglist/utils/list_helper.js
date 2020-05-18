const _ = require('lodash');

const dummy = (blogs) => {
   return 1
  }
const totalLikes = (blogs) =>{
    const reducer = (sum, blog) => {
        return sum + blog.likes
      }
      return blogs.length === 0
      ? 0
      : blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {
  const dummyblogs = [...blogs]
  const sortFunction = (current,next) =>{
    return next.likes-current.likes
  }
  dummyblogs.sort(sortFunction);
  return dummyblogs[0];
}
const mostBlogs = (blogs)=>{
  if(blogs.length>0){
    const dummyBlogs = [...blogs]
  const sortedBlogs= _.countBy(dummyBlogs,"author")
  const maxAuthor = _.maxBy(_.keys(sortedBlogs),  (o) => sortedBlogs[o]);
  return {
      "author": maxAuthor,
      "blogs" : sortedBlogs[maxAuthor]
  }
  }else{
    return 0;
  }
  
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const likesArr = blogs.map(blog => ({ author: blog.author, likes: blog.likes }));
  const result = likesArr.reduce((acc, curr) => {
    // console.log('before = ', acc);
    acc[curr.author] = acc[curr.author] === undefined ? curr.likes : curr.likes + acc[curr.author];
    // console.log('after = ', acc);
    return acc;
  }, {});
  const sortedLikes = Object.entries(result).sort((a, b) => b[1] - a[1]);
  return { author: sortedLikes[0][0], likes: sortedLikes[0][1] };
};

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
  //TODO exercise 4.6 and 4.7