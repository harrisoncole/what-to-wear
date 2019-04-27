import React from 'react'
import {unixToTime} from '../utils'
import Wardrobe from './Wardrobe'

const Forecast = ({forecast}) => {
  const highTime = unixToTime(forecast.temperatureHighTime)
  const lowTime = unixToTime(forecast.temperatureLowTime)
  const sunrise = unixToTime(forecast.sunriseTime)
  const sunset = unixToTime(forecast.sunsetTime)
  const precipProb = forecast.precipProbability * 100
  const precipType = forecast.precipType
  const high = forecast.temperatureHigh
  const low = forecast.temperatureLow
  const humidity = forecast.humidity * 100
  const uvIndex = forecast.uvIndex
  const cloudCover = forecast.cloudCover * 100
  const props = {high, low, cloudCover, precipProb}
  return (
    <div>
      {low === 'NaN' ? (
        <p>loading...</p>
      ) : (
        <div>
          <p>
            Today's forecast has a low of {low} at {lowTime}, a high of {high}{' '}
            at {highTime}. Sunrise at {sunrise} and sunset at {sunset}. There's
            a {precipProb}% chance of{' '}
            {precipType ? precipType : 'precipitation'}. Humidity will be{' '}
            {humidity}% and there's a UV Index of {uvIndex}. There will be an
            average of {cloudCover}% cloud cover.
          </p>
          {/* <Wardrobe {...props} /> */}
        </div>
      )}
    </div>
  )
}

export default Forecast
