import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'

const LogoutScreen = () => {
  const user = useSelector(state => state.user)
  const name = user.name
  const dispatch = useDispatch()
  const logout = (event) => {
    event.preventDefault()
    dispatch(handleLogout())
  }


  return(<p>{name} logged in <button type='submit' onClick={logout}>Logout</button> </p>)
}

export default LogoutScreen