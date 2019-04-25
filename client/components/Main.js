import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Main = () => {
  const [weather, setWeather] = useState({})
  const [zipCode, setZipcode] = useState(10025)

  return (
    <div>
      <h1>Hello Naked Person</h1>
      <form
        onSubmit={evt => {
          formSubmission(evt, setWeather, zipCode)
        }}
      >
        <label for="zip">Enter zip code</label>
        <input name="zip" onChange={e => setZipcode(e.target.value)} />
        <button type="submit">tell me something good</button>
      </form>

      {weather.temperature ? (
        <h2>Current temp: {weather.temperature}</h2>
      ) : (
        <h2>waiting...</h2>
      )}
    </div>
  )
}

export default Main

async function getWeekForecast(zip) {
  const {data} = await axios.get(`/api/weather/${zip}/weekly`)
  return data
}

async function getCurrentWeather(zip) {
  const {data} = await axios.get(`/api/weather/${zip}`)
  return data
}

async function formSubmission(event, setter, zipCode) {
  event.preventDefault()
  console.log('form submisson:')
  const current = await getCurrentWeather(zipCode)
  console.log('got weather:', current)
  setter(current)
}
