import React from 'react'
import Location from './Location'
import {avgXHrPctMetric, roundedPercent} from '../utils'

const Weather = ({weather, address, coords}) => {
  const today = weather.daily.data[0]
  const avgPrecip = avgXHrPctMetric(weather.hourly.data, 8, 'precipProbability')

  return (
    <div>
      <h3 id="temp">{weather.currently.temperature}&deg;</h3>
      <Location address={address} />
      <p>
        {weather.hourly.summary}{' '}
        {roundedPercent(weather.currently.precipProbability)}% chance of{' '}
        {today.precipType ? today.precipType : 'precipitation'} at the moment,
        and {avgPrecip}% average over the next 8 hours. There's{' '}
        {roundedPercent(today.cloudCover)}% cloud cover.
      </p>
    </div>
  )
}

export default Weather
