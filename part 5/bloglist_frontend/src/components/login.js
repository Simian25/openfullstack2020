import React from 'react'



export const LoginScreen = ({ username,password,setUsername,setPassword,onSubmit }) => {
  return(<form onSubmit={onSubmit}>
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
  </form>)
}

export const LogoutScreen = ({ name,onClick }) => {
  return(<p>{name} logged in <button type='submit' onClick={onClick}>Logout</button> </p>)
}