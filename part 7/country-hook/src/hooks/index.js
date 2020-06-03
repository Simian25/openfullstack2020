import {useState,useEffect} from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    
    useEffect(() => {
       const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
       console.log(url)
       if(name){
         axios.get(url).then(res => {setCountry({data:res.data[0],found:true})
        console.log({...res,found:true})})
        .catch(err => setCountry(err)) 
       }
      },[name],);
  
    return country
  }