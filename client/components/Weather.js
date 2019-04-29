import React from 'react'
import Location from './Location'
import {avgXHrPctMetric, roundedPercent} from '../utils'

const Weather = ({weather, address, coords}) => {
  const avgPrecip = avgXHrPctMetric(weather.hourly.data, 8, 'precipProbability')

  return (
    <div>
      <h3 id="temp">{weather.currently.temperature}&deg;</h3>
      <Location address={address} />
    </div>
  )
}

export default Weather
