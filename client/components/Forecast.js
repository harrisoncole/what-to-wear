import React from 'react'
import {maxMetric, minMetric, avgXHrPctMetric} from '../utils'
import Wardrobe from './Wardrobe'

const Forecast = ({forecast, currentTemp, profile}) => {
  const hourlyArr = forecast.hourly.data.slice(0, 8)
  const precipType = forecast.daily.data[0].precipType

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
        <div>
          <Wardrobe {...props} />
          <p>
            Today's forecast has a low of {Math.floor(low)}&deg; at {lowTime}, a
            high of {Math.ceil(high)}&deg; at {highTime}. There's a {precipProb}%
            average chance of precipitation.{' '}
            {maxRain > 0.1 &&
              `The most intense precipitation is forecast for ${maxRainTime}. `}Humidity
            will be {humidity}% and there's a UV Index of {uvIndex}. There will
            be an average of {cloudCover}% cloud cover. The offset is{' '}
            {profile.offset}.
          </p>
        </div>
      )}
    </div>
  )
}

export default Forecast
