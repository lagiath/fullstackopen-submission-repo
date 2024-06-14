import { useState } from 'react'
import axios from 'axios'

const Countries = ({ country, showSingle }) => {
  return (
    <>
    <p>{country.name.common} <button onClick={showSingle}>show</button></p>
    </>
  )
}

const SingleCountry = ({ country, weather }) => {
  const c = weather.main?.temp - 273.15
    return ( 
     <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital} <br/> area {country.area}</p>
        <div><strong>languages:</strong>
          <ul>
            {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
          </ul>
          <img src={country.flags.png} />
        </div>
      <div>
        <h1>Weather in {country.capital}</h1>
        <p>temperature {Math.floor(c * 100) / 100} C</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather?.icon}@2x.png`}/>   
      <p>wind speed {weather.wind?.speed} m/s</p>
      </div>
      </div>
    )
}

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>find countries <input value={filter} onChange={handleFilter} /></div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const [weather, setWeather] = useState([])
  const api_key = import.meta.env.VITE_SOME_KEY 

  const handleShowSingle = country => {
    setSelected(country)
    getWeather(country.capital)
  }

  const getWeather = (cityName) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=api_key`).then(response => {
      setWeather(response.data)
    })
    
  }

  const handleFilter = (event) => {
    const filterVal = event.target.value.toLowerCase()
    setFilter(filterVal)
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(filterVal)))
    })
    setCountries([])
    setSelected(null)
  }
  
  return (
   <div>
    <Filter filter={filter} handleFilter={handleFilter} />
    {countries.length > 10 ? <p>Too many matches, specify another filter</p> : countries.length > 1 ? countries.map(country => <Countries key={country.cca3} country={country} showSingle={() => handleShowSingle(country)}/>) : countries.map(country => <SingleCountry key={country.cca3} country={country} weather={weather} /> )} 
    {selected ? <SingleCountry country={selected} weather={weather}/> : null}
   </div>
    
  )
}

export default App
