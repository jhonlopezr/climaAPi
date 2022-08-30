import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import './App.css'


function App() {
    const [latlon, setLatlon] = useState()
    const [clima, setClima] = useState()
    const [temperatura, setTemperatura] = useState("Celsius")
    const iconsList = [
        "01n@4x.png",
        "02n@4x.png",
        "03n@4x.png",
        "04n@4x.png",
        "09n@4x.png",
        "10n@4x.png",
        "11n@4x.png",
        "13n@4x.png",
        "50n@4x.png",
    ];

    let weatherIcon = iconsList[8];
    switch (clima?.weather[0].description) {
      case "clear sky":
        weatherIcon = iconsList[0];
        break;
  
      case "few clouds":
        weatherIcon = iconsList[1];
        break;
  
      case "scattered clouds":
        weatherIcon = iconsList[2];
        break;
  
      case "broken clouds":
        weatherIcon = iconsList[3];
        break;
  
      case "shower rain":
        weatherIcon = iconsList[4];
        break;
  
      case "rain":
        weatherIcon = iconsList[5];
        break;
  
      case "thunderstorm":
        weatherIcon = iconsList[6];
        break;
  
      case "snow":
        weatherIcon = iconsList[7];
        break;
  
      case "mist":
        weatherIcon = iconsList[8];
        break;
    }
  
  
  useEffect(() => {
    const success = (posicion)=>{
      const latitud = posicion.coords.latitude 
      const longitud = posicion.coords.longitude 
      setLatlon({latitud, longitud})
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  useEffect(() => {
    if(latlon != undefined){
      const API_KEY = "b709e6b93347071ae10b1cc0d6f2607e";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.latitud}&lon=${latlon.longitud}&appid=${API_KEY}`;
      axios
      .get(URL)
      .then((res)=>setClima(res.data))
      .catch((err) => console.log(err))
  }
  }, [latlon])
  
  const unidadesDeMedida = () =>{
      if(unidadesDeMedida=="Celcius"){
          setTemperatura("Fahrenheit")
      }else{
          setTemperatura("Celcius")
      }
  
  }
  
  console.log(latlon)
  console.log(clima)


  return (
        <div>
        <div className='cuadroPrincipal'>
            <div className='datosClima'>
                <h1>Clima ISAMC</h1>
                <h2>Pais: {clima?.sys.country}</h2>
                <h3>Ciudad: {clima?.name}</h3>
               <img src={`http://openweathermap.org/img/wn/${weatherIcon}`}></img>
                <h3>Temperatura: {clima?.main.temp} °</h3>
                <h3>Temp Min: {clima?.main.temp_min} °</h3>
                <h3>Temp Max: {clima?.main.temp_max} °</h3>

            </div>
    </div>
    </div>
  )
}

export default App