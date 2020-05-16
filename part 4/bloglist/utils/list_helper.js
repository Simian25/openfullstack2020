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
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }
  //TODO exercise 4.6 and 4.7