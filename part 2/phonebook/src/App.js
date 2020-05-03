import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'



const App = () => {
  const [ persons, setPersons ] = useState([
  ]); 
  const [ newName, setNewName ] = useState('');
  
  const [newNumber,setNewNumber] = useState('');

  const [filteredName,setFilteredName] = useState('');

  const hook = () => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      console.log('promise fulfi:led');
      setPersons(response);
    })


  };
  useEffect(hook,[]);

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