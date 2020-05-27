import React from 'react'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdoteService'
import { useDispatch } from 'react-redux'



const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch(addNewAnecdote(newAnecdote))

  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm