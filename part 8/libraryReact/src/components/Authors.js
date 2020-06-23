  
import React,{useState} from 'react'
import {useQuery,useMutation } from '@apollo/client';
import {ALL_AUTHORS,UPDATE_BIRTH} from '../queries'
import Select from 'react-select';
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const[name,setName] = useState(null)
  const[born,setBorn] = useState('')
  const [updateBirth] = useMutation(UPDATE_BIRTH,{refetchQueries:[{query:ALL_AUTHORS}]})
  let authors=[]
  let options = []
  if (!props.show) {
    return null
  }
  if(!result.loading){
    authors=result.data.allAuthors
    options = authors.map(a=>{return({value:a.name,label:a.name})})
  }
  const submit = (event)=>{
    event.preventDefault()
    console.log(name,born)
    updateBirth({  variables: {name:name.value,born:Number(born)} })

    setName('')
    setBorn('')
  }
const handleChange = (data)=>{
  setName(data)
  console.log(data.value)
}

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
          <form onSubmit={submit}>
          <div>
          <Select value={name} onChange={handleChange} options={options}/>
          <p>
          born
          <input
          value={born}
          onChange={({target})=>setBorn(target.value)}/>
          </p>
          <button type='submit'>Update</button>
        </div>
          </form>
    </div>
  )
}

export default Authors
