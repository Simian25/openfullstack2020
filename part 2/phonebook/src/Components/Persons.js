import React from 'react'

const Person = ({person,onClick}) =>{ 

return(
    <div>
<p>{person.name} {person.number}</p>
<button onClick={onClick}>delete</button>

</div>)}

const Persons = ({persons,onClick}) => persons.map(person => <Person onClick = {() => onClick(person)} key={person.name} person={person}/>)

export default Persons;