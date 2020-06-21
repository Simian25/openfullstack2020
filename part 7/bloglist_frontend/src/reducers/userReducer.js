import userService from '../services/userService'

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type:'INIT_USERS',
      data:{ users }
    })
  }
}




const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    state=action.data.users
    return state.sort((a,b) => b.name-a.name)
  default:
    return state
  }
}

export default reducer