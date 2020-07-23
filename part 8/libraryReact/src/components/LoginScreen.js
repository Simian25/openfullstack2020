import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginScreen = ({ show, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

 
  const [ login, result ] = useMutation(LOGIN, {    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {    if ( result.data ) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('loggedInUser', token)    }  }, [result.data]) // eslint-disable-line
  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }
  if(!show){
    return null
}
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginScreen