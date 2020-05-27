import React from 'react'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
const mapDispatchToProps = {
  addNewAnecdote
}

const AnecdoteForm = ({ addNewAnecdote }) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    addNewAnecdote(content)

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

export default connect(null,mapDispatchToProps)(AnecdoteForm)