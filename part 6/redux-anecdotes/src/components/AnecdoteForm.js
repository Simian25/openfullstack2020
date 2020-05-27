import React from 'react'
import {addNewAnecdote} from '../reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'



const AnecdoteForm = (props) =>{
    const dispatch = useDispatch()
    const addAnecdote = (event)=>{
          event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addNewAnecdote(content))
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