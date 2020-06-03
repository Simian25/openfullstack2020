import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {  token = `bearer ${newToken}`}

const create = async newObject => {
  const config = {    headers: { Authorization: token },  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const like = async (obj) => {
  obj.likes=obj.likes+1
  const config = {    headers: { Authorization: token },  }

  const newObj = {
    user:obj.user,
    author:obj.author,
    title:obj.title,
    url:obj.url,
    likes:obj.likes
  }
  const url = `${baseUrl}/${obj.id}`
  console.log(url)
  const response = await axios.put(url,newObj,config)
  return response.data
}
const deleteBlog = async(obj) => {
  const config = {    headers: { Authorization: token },  }

  const url = `${baseUrl}/${obj.id}`
  const response = await axios.delete(url,config,)
  return response.data
}

export default { getAll,setToken,create,like,deleteBlog }