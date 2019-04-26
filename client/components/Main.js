import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CreateIcon from './CreateIcon'

const Main = () => {
  const [weather, setWeather] = useState({})
  const [coords, setCoords] = useState('')
  const [displayButton, setDisplayButton] = useState(false)
  const [prompt, setPrompt] = useState({})

  useEffect(() => {
    const storage = window.localStorage
    async function getCoords() {
      await navigator.geolocation.getCurrentPosition(pos => {
        let current = pos.coords.latitude + '_' + pos.coords.longitude
        window.localStorage.lat = pos.coords.latitude
        window.localStorage.long = pos.coords.longitude
        setCoords(current)
      })
    }
    if (storage.lat && storage.long) {
      setCoords(storage.lat + '_' + storage.long)
      getCoords()
    } else {
      getCoords()
    }
  }, [])

  useEffect(
    () => {
      async function getCurrentWeather(coordStr) {
        const {data} = await axios.get(`/api/weather/${coordStr}`)
        setWeather(data)
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
    <div>
      <h1>Hello Naked Person</h1>
      {!coords.length > 0 ? (
        <h2> loading...</h2>
      ) : (
        <div>
          <h3>
            You are here: {coords.split('_')[0]}, {coords.split('_')[1]}
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

      {displayButton && (
        <CreateIcon prompt={prompt} setDisplayButton={setDisplayButton} />
      )}
    </div>
  )
}

export default Main
