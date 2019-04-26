import React from 'react'
import {unixToTime} from '../utils'

const Forecast = ({forecast}) => {
  const high = forecast.temperatureHigh
  const highTime = unixToTime(forecast.temperatureHighTime)
  const low = forecast.temperatureLow
  const lowTime = unixToTime(forecast.temperatureLowTime)

  return (
    <div>
      <h1>
        Low of {low} at {lowTime}
      </h1>
      <h1>
        High of {high} at {highTime}
      </h1>
    </div>
  )
}

export default Forecast
