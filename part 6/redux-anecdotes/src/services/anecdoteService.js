import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}
const addNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const id = getId()
  const anecdote = {
    votes:0,
    content,
    id
  }
  const response = await axios.post(baseUrl,anecdote)
  return response.data
}

const likeAnecdote = async (anecdote) => {
  const id = anecdote.id
  const likedAnecdote = { ...anecdote,
    votes:anecdote.votes+1 }
  console.log(likedAnecdote)
  await axios.put(`${baseUrl}/${id}`,likedAnecdote)
}

export default { getAll,addNew,likeAnecdote }