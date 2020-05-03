import React from 'react'
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
        <img src={country.flag} alt="the flag of the country"/>
        </div>
    )

}
export default Country;