import React from 'react'
import Weather from './Weather'



const Country = ({country,useFull}) =>

{
    if(!useFull){
        return <p>{country.name}</p>
    }
    else{
        return <FullCountry country={country}/>
    }
}
const FullCountry = ({country}) =>{
    return(
<div key={country.name}>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population {country.population}</p>
        <h1>Languages</h1>
        <li>
            {country.languages.map((language)=>{
            return(
            <ul key={language.iso639_1}>{language.name}</ul>);
            
        }            
            )}

        </li>
        <img width="150" height="150" src={country.flag} alt="the flag of the country"/>
        <h1>Weather</h1>
        <Weather country={country}/>
        </div>
    )

}
export default Country;