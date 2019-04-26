import React from 'react'

const Weather = ({weather}) => {
  return (
    <div>
      <h3>Today's weather: </h3>
      <p>
        {weather.summary}, {weather.temperature} degrees, with a{' '}
        {weather.precipProbability * 100}% chance of {weather.precipType}.
        There's {weather.cloudCover * 100}% cloud cover. The current UV Index is{' '}
        {weather.uvIndex}.
      </p>
    </div>
  )
}

export default Weather
