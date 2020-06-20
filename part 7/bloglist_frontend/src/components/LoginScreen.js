import React from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/userReducer'


const LoginScreen = ({ username,password,setUsername,setPassword,onSubmit }) => {
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(handleLogin({ username,password }))
  }
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <h2>login</h2>
    username
        <input type="text" id='username' onChange={setUsername} value={username} name="username" />
      </div>
      <div>
      password
        <input type="password" id='password' value={password} name="Password" onChange={setPassword} />
      </div>
      <button id='loginButton' type="submit">login</button>
    </form>
  )
}

export default LoginScreen