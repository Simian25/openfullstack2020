import React, { useState,useEffect } from 'react'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import personService from './Services/persons'
import Filter from './Components/Filter'



const App = () => {
  const [ persons, setPersons ] = useState([
  ]); 
  const [ newName, setNewName ] = useState('');
  
  const [newNumber,setNewNumber] = useState('');

  const [filteredName,setFilteredName] = useState('');

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {        setPersons(initialPersons)      })
  }, [])
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
    const personToChange = persons.find((person)=>person.name.toLowerCase()===newName.toLowerCase())
    if(typeof personToChange !== 'undefined'){
      if(window.confirm(`${newName} is already added to phonebook, replace number with new one?`)){
        personService.update(personToChange.id,personObject)
        .then(returnedPerson => {setPersons(persons.map((person)=> person.id===returnedPerson.id ? returnedPerson:person ))})
      };

    }else{
      personService.create(personObject)
      .then(returnedPerson => {setPersons(persons.concat(returnedPerson)); })
    }
    setNewName("");
  }


  const filterNames = (event)=> {
    setFilteredName(event.target.value.trimStart());
  }
  const deletePerson = (personToDelete) => {
    if(window.confirm(`confirm deletion of ${personToDelete.name}`)){
      personService
    .deleteByID(personToDelete.id)
    .then(setPersons(persons.filter((person) => person.id!==personToDelete.id)))
    }
  }

  const namesToShow=persons.filter((person)=> person.name.toLowerCase().startsWith(filteredName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterNames} input={filteredName}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} onNameChange={updateName} onNumberChange={updateNumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
     <Persons persons={namesToShow} onClick={deletePerson}/>
    </div>
  )
}

export default App