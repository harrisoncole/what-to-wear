import React from 'react'
import {maxMetric, minMetric, avgXHrPctMetric, roundedPercent} from '../utils'
import Wardrobe from './Wardrobe'

const Forecast = ({forecast, currentTemp, profile}) => {
  const hourlyArr = forecast.hourly.data.slice(0, 8)
  const precipType = forecast.daily.data[0].precipType
  const today = forecast.daily.data[0]
  const [maxRainTime, maxRain] = maxMetric(hourlyArr, 'precipIntensity')
  const [highTime, high] = maxMetric(hourlyArr, 'temperature')
  const [lowTime, low] = minMetric(hourlyArr, 'temperature')
  const precipProb = avgXHrPctMetric(hourlyArr, 8, 'precipProbability')

  const humidity = avgXHrPctMetric(hourlyArr, 8, 'humidity')
  const [indexTime, uvIndex] = maxMetric(hourlyArr, 'uvIndex')
  const cloudCover = avgXHrPctMetric(hourlyArr, 8, 'cloudCover')
  const props = {
    high,
    low,
    cloudCover,
    currentTemp,
    precipProb,
    uvIndex,
    precipType,
    profile
  }
  return (
    <div>
      {low === 'NaN' ? (
        <p>loading...</p>
      ) : (
        <div className="weather-deets">
          <Wardrobe {...props} />
          <h3>Weather deets:</h3>
          <p>
            {forecast.hourly.summary}{' '}
            {roundedPercent(forecast.currently.precipProbability)}% chance of{' '}
            {today.precipType ? today.precipType : 'precipitation'} at the
            moment.
          </p>
          <p>
            Today's forecast has a low of {Math.floor(low)}&deg; at {lowTime}, a
            high of {Math.ceil(high)}&deg; at {highTime}. There's a {precipProb}%
            average chance of precipitation over the next 8 hours.{' '}
            {maxRain > 0.1 &&
              `The most intense precipitation is forecast for ${maxRainTime}. `}Humidity
            will be {humidity}% and there's a UV Index of {uvIndex}. There will
            be an average of {cloudCover}% cloud cover.
          </p>
        </div>
      )}
    </div>
  )
}

export default Forecast
