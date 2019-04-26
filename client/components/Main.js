import React, {useState, useEffect} from 'react'
import {getCurrentWeather, getCoords} from '../utils'
import CreateIcon from './CreateIcon'

const Main = ({displayButton, deferredPrompt}) => {
  const [weather, setWeather] = useState({})
  const [coords, setCoords] = useState([0, 0])

  console.log('synchonicity test:')
  useEffect(() => {
    async function getCoords() {
      await navigator.geolocation.getCurrentPosition(pos => {
        setCoords([pos.coords.latitude, pos.coords.longitude])
        console.log('coords:', [pos.coords.latitude, pos.coords.longitude])
      })
    }
    getCoords()
  }, [])
  return (
    <div>
      <h1>Hello Naked Person</h1>

      {/* {weather.temperature ? (
        <h2>Current temp: {weather.temperature}</h2>
      ) : (
        <h2>I'm waiting...</h2>
      )} */}

      {coords[0] === 0 && coords[1] === 0 ? (
        <h2> I'm waiting...</h2>
      ) : (
        <h2>
          Current Coords: {coords[0]}, {coords[1]}
        </h2>
      )}

      {displayButton && <CreateIcon deferredPrompt={deferredPrompt} />}
    </div>
  )
}

export default Main
