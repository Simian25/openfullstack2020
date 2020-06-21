import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { handleLogin } from '../reducers/loginReducer'


const LoginScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(handleLogin({ username,password }))
    history.push('/')
  }
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <h2>login</h2>
    username
        <input type="text" id='username'name="username" />
      </div>
      <div>
      password
        <input type="password" id='password' name="Password" />
      </div>
      <button id='loginButton' type="submit">login</button>
    </form>
  )
}

export default LoginScreen