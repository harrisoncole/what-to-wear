import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CreateIcon from './CreateIcon'
import Weather from './Weather'
import Forecast from './Forecast'
import {getLatitude, getLongitude} from '../utils'

const Main = () => {
  const [weather, setWeather] = useState({})
  const [forecast, setForecast] = useState({})
  const [coords, setCoords] = useState('')
  const [displayButton, setDisplayButton] = useState(false)
  const [prompt, setPrompt] = useState({})
  const [address, setAddress] = useState('')

  useEffect(() => {
    async function getCoords() {
      await navigator.geolocation.getCurrentPosition(pos => {
        let current = pos.coords.latitude + '_' + pos.coords.longitude
        if (
          getLatitude() !== pos.coords.latitude.toString() ||
          getLongitude() !== pos.coords.longitude.toString()
        ) {
          window.localStorage.setItem('lat', pos.coords.latitude.toString())
          window.localStorage.setItem('long', pos.coords.longitude.toString())
          setCoords(current)
        }
      })
    }
    if (getLatitude() && getLongitude()) {
      setCoords(getLatitude() + '_' + getLongitude())
      getCoords()
    } else {
      getCoords()
    }
  }, [])

  useEffect(
    () => {
      async function getCurrentWeather(coordStr) {
        const {data} = await axios.get(`/api/weather/${coordStr}`)
        const fcst = await axios.get(`/api/weather/${coordStr}/forecast`)
        setWeather(data.weather)
        setForecast(fcst.data)
        setAddress(data.address)
      }

      if (coords.length > 0) {
        getCurrentWeather(coords)
      }
    },
    [coords]
  )

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', evt => {
      evt.preventDefault()
      setPrompt(evt)
      setDisplayButton(true)
    })
  }, [])

  return (
    <div className="home-container">
      <h1 className="title">
        What to Wear <i class="fas fa-globe-americas" />
      </h1>
      <h2>Hello Naked Person.</h2>
      {!weather.summary ? (
        <h2> I'm thinking, okay?</h2>
      ) : (
        <div>
          <h4>
            {address}{' '}
            <span>
              [{coords.split('_')[0]}, {coords.split('_')[1]}]
            </span>
          </h4>
          <Weather weather={weather} />
          <Forecast forecast={forecast} currentTemp={weather.temperature} />
        </div>
      )}

      {displayButton && (
        <CreateIcon prompt={prompt} setDisplayButton={setDisplayButton} />
      )}
    </div>
  )
}

export default Main
