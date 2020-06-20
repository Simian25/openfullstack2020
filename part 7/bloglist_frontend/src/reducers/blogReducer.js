import blogService from '../services/blogService'

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type:'INIT',
      data:{ blogs }
    })
  }
}
const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    state=action.data.blogs
    break
  default:
    return state
  }
  return state
}

export default reducer