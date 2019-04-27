import React from 'react'

const Weather = ({weather}) => {
  return (
    <div>
      <h3 id="temp">{weather.temperature}&deg;</h3>
      <p>
        {weather.summary}, with a {Math.floor(weather.precipProbability * 100)}%
        chance of {weather.precipType ? weather.precipType : 'precipitation'}.
        There's {weather.cloudCover * 100}% cloud cover.
      </p>
    </div>
  )
}

export default Weather
