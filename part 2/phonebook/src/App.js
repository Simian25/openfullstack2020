import React, { useState } from 'react'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]); 
  const [ newName, setNewName ] = useState('');
  
  const [newNumber,setNewNumber] = useState('');

  const [filteredName,setFilteredName] = useState('');

  const updateName = (event) => {
    setNewName(event.target.value);
  }
  const updateNumber = (event) => {
    setNewNumber(event.target.value);
  }


  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.findIndex((person)=>person.name===newName)<0){
      setPersons(persons.concat(personObject));
    }else{
      console.log(persons.findIndex((person)=>person.name===personObject.name)<0)
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
  }


  const filterNames = (event)=> {
    setFilteredName(event.target.value.trimStart());
  }


  const namesToShow=persons.filter((person)=> person.name.toLowerCase().startsWith(filteredName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterNames} input={filteredName}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} onNameChange={updateName} onNumberChange={updateNumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
     <Persons persons={namesToShow}/>
    </div>
  )
}

export default App