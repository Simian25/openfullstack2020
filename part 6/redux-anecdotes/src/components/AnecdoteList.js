import React from 'react'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

import AnecdoteFilter from './AnecdoteFilter'
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}
const mapDispatchToProps = {
  voteForAnecdote,
  setNotification
}
const AnecdoteList = ({ anecdotes,filter,voteForAnecdote,setNotification }) => {

  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    voteForAnecdote(anecdote)
    setNotification(`you voted for '${anecdote.content}'`,3)}
  return(
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter/>
      {filteredAnecdotes.map(anecdote =>
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
export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)