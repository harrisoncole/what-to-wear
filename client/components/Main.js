import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CreateIcon from './CreateIcon'
import Weather from './Weather'
import Forecast from './Forecast'
import Location from './Location'
import moment from 'moment'
import Form from './Form'
import {getLatitude, getLongitude, getTime, compareTime} from '../utils'

const Main = () => {
  //STATE
  const [forecast, setForecast] = useState({})
  const [coords, setCoords] = useState('')
  const [displayButton, setDisplayButton] = useState(false)
  const [prompt, setPrompt] = useState({})
  const [address, setAddress] = useState('')

  //EFFECTS
  useEffect(() => {
    async function getCoords() {
      window.localStorage.setItem('time', JSON.stringify(moment()))
      await navigator.geolocation.getCurrentPosition(pos => {
        let current = pos.coords.latitude + '_' + pos.coords.longitude
        if (
          Math.floor(Number(getLatitude())) !==
            Math.floor(pos.coords.latitude) ||
          Math.floor(Number(getLongitude())) !==
            Math.floor(pos.coords.longitude)
        ) {
          window.localStorage.setItem('lat', pos.coords.latitude.toString())
          window.localStorage.setItem('long', pos.coords.longitude.toString())
          setCoords(current)
        }
      })
    }

    if (getLatitude() && getLongitude()) {
      let now = moment()
      let then = getTime()
      if (compareTime(now, then) > 10) {
        setCoords(getLatitude() + '_' + getLongitude())
        getCoords()
      } else if (coords.length === 0) {
        setCoords(getLatitude() + '_' + getLongitude())
      }
    } else {
      getCoords()
    }
  }, [])

  useEffect(
    () => {
      async function getCurrentWeather(coordStr) {
        const {data} = await axios.get(`/api/weather/${coordStr}/forecast`)
        setForecast(data.forecast)
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
        <span>
          What to Wear <i class="fas fa-globe-americas" />{' '}
        </span>
        <span id="tm">powered by Dark Sky</span>
      </h1>
      <div className="home-container-inner">
        <h3>Hello Naked Person.</h3>
        {!forecast.currently ? (
          <h2> I'm thinking, okay?</h2>
        ) : (
          <div>
            <Weather weather={forecast} address={address} coords={coords} />
            <Forecast
              forecast={forecast}
              currentTemp={forecast.currently.temperature}
            />
            <Form setForecast={setForecast} setAddress={setAddress} />
          </div>
        )}

        {displayButton && (
          <CreateIcon prompt={prompt} setDisplayButton={setDisplayButton} />
        )}
      </div>
    </div>
  )
}

export default Main
