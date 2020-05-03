import React ,{useState, useEffect}from 'react'
import Country from './Country'
import Button from './Button';




const Results = ({countryList}) => {
    const [countries, setCountries] = useState([]);
    const handleClick = event => {
        console.log(event.target.id);
        setCountries([countries.find(country => country.name === event.target.id)]);
    }
  useEffect(() => {
    setCountries(countryList);
  }, [countryList]);
    
if(countries.length>9){
    return 'Too many matches, specify another filter'
}    
if(countries.length===1){
    return  countries.map(country => <Country  key={country.alpha2Code} country={country} useFull={true} />)
}    
return countries.map(country => <div key={country.alpha2Code} ><Country country={country} useFull={false}/><Button id={country.name} onClick={handleClick} text='show'></Button></div>)

}

export default Results;