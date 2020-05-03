import React,{useState,useEffect} from 'react';
import axios from 'axios'

const api=process.env.REACT_APP_WEATHER;


const Weather = ({country}) =>{
    const [weather,setWeather] = useState([]);
    const hook = () => {
        console.log(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api}`)
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api}&units=metric`)
        .then((promise)=>{

            setWeather([promise.data])
            console.log(promise.data);
        })
    }
    useEffect(hook,[]);
    const displayWeather = () => (weather.map(weather => {
        return(
            <div key={weather.main.temp}>
            <p>Temperature {weather.main.temp}°C</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'/>
            <p>Wind {weather.wind.speed} km/h</p>
            </div>


        )
    }))

    return(
        <div>
            {displayWeather()}
        </div>


    )
}



export default Weather;