import blogService from '../services/blogService'
import loginService from '../services/login'

export const checkUser = () => {
  const loggedInUser = window.localStorage.getItem('loggedInUser')
  if(loggedInUser){
    const user = JSON.parse(loggedInUser)
    blogService.setToken(user.token)
    return{
      type: 'INIT_LOGIN',
      data: { user }
    }
  }
  return{
    type: 'INIT_LOGIN',
    data: { user:null }
  }
}
export const handleLogin = (userCredentials) => {
  return async dispatch => {
    const user = await loginService.login(userCredentials)
    window.localStorage.setItem( 'loggedInUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type:'INIT_LOGIN',
      data:{ user }
    })
  }
}

export const handleLogout = () => {
  window.localStorage.removeItem('loggedInUser')
  return{
    type:'LOGOUT'
  }
}
const reducer = (state = null, action) => {
  switch(action.type){
  case 'INIT_LOGIN':
    state=action.data.user
    return state
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export default reducer