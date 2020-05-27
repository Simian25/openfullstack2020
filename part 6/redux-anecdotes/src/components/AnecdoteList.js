import React from 'react'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setMessage,resetMessage } from '../reducers/notificationReducer'
import { useDispatch,useSelector } from 'react-redux'

import AnecdoteFilter from './AnecdoteFilter'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch(voteForAnecdote(anecdote.id))
    dispatch(setMessage(`you voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 3000)}
  return(
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>

  )
}
export default AnecdoteList