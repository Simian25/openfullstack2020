import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

const LogoutScreen = () => {
  const user = useSelector(state => state.user)
  const name = user.name
  const history = useHistory()
  const dispatch = useDispatch()
  const logout = (event) => {
    event.preventDefault()
    dispatch(handleLogout())
    history.push('/')
  }


  return(<p>{name} logged in <button type='submit' onClick={logout}>Logout</button> </p>)
}

export default LogoutScreen