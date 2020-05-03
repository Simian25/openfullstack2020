import React,{useState,useEffect} from 'react';
import Filter from './Components/Filter'
import Result from './Components/Result'
import axios from 'axios'
function App() {
  const [countries,setCountries] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((promise)=>{
        setCountries(promise.data)
    })

  }
  
  
  
  useEffect(hook,[])
  const updateFilter = (event) => {
    setFilterInput(event.target.value);
  }

  const filteredCountries =countries.filter((country) => country.name.toLowerCase().includes(filterInput.toLowerCase()))



  return (
    <div>
      <Filter onChange={updateFilter} value={filterInput}></Filter>
      <Result countryList={filteredCountries}></Result>
    </div>
  );
}

export default App;
