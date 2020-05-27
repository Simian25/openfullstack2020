


export const voteForAnecdote = (id) => {
  return{
    type: 'LIKE',
    data: { id }
  }
}
export const addNewAnecdote = (data) => {
  return{
    type:'ADD_NEW',
    data
  }
}

export const initializeAnecdotes = (anecdotes) =>{
  return{
    type:'INITIALIZE',
    data : anecdotes
  }
}

const reducer = (state = [], action) => {
  switch(action.type){
  case 'LIKE':{
    const id = action.data.id
    const anecdoteToChange = state.find(a => a.id===id)
    const changedAnecdote ={
      ...anecdoteToChange,
      votes:anecdoteToChange.votes +1
    }

    return state.map(anecdote => anecdote.id!==id ? anecdote:changedAnecdote).sort((a,b) => b.votes-a.votes)
  }
  case 'ADD_NEW':
  {const newAnecdote = action.data
    console.log(newAnecdote)
    return  [...state,newAnecdote]}
  case 'INITIALIZE':
    return action.data
  default:
    return state
  }

}

export default reducer