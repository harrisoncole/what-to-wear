import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {getCurrentWeather, getCoords} from '../utils'
import CreateIcon from './CreateIcon'

const Main = ({displayButton, deferredPrompt}) => {
  const [weather, setWeather] = useState({})
  const [coords, setCoords] = useState({})

  console.log('synchonicity test:')
  useEffect(() => {
    async function getCoords() {
      await navigator.geolocation.getCurrentPosition(pos => {
        setCoords({lat: pos.coords.latitude, long: pos.coords.longitude})
      })
    }
    getCoords()
  }, [])

  useEffect(
    () => {
      async function getCurrentWeather(coordObj) {
        const {data} = await axios.post(`/api/weather/daily`, coordObj)
        setWeather(data)
      }

      if (coords.lat) {
        getCurrentWeather(coords)
      }
    },
    [coords]
  )

  return (
    <div>
      <h1>Hello Naked Person</h1>

      {/* {weather.temperature ? (
        <h2>Current temp: {weather.temperature}</h2>
      ) : (
        <h2>I'm waiting...</h2>
      )} */}

      {!coords.lat ? (
        <h2> loading...</h2>
      ) : (
        <div>
          <h3>
            You are here: {coords.lat}, {coords.long}
          </h3>
          <h3>Today's weather: </h3>
          <p>
            {weather.summary}, {weather.temperature} degrees, with a{' '}
            {weather.precipProbability * 100}% chance of {weather.precipType}.
            There's {weather.cloudCover * 100}% cloud cover. The current UV
            Index is {weather.uvIndex}.
          </p>
        </div>
      )}

      {displayButton && <CreateIcon deferredPrompt={deferredPrompt} />}
    </div>
  )
}

export default Main
