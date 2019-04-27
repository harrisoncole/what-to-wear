const router = require('express').Router()
const DarkSkyApi = require('dark-sky-api')
const axios = require('axios')

let GOOGLE_MAPS_KEY

// if (process.env.NODE_ENV === 'development') {
require('dotenv').config()
// }

DarkSkyApi.apiKey = process.env.DARK_SKY_KEY
GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY

// else {
//   DarkSkyApi.apiKey = functions.config().app.dark_sky_key
//   GOOGLE_MAPS_KEY = functions.config().app.google_maps_key
// }

DarkSkyApi.proxy = true

const zipNotFound = new Error('zip code not found')
zipNotFound.status = 404

router.get('/:coords', async (req, res, next) => {
  try {
    const [latitude, longitude] = req.params.coords
      .split('_')
      .map(c => Number(c))

    // const weatherObj = await DarkSkyApi.loadCurrent({
    //   latitude,
    //   longitude
    // })

    // const {data} = await axios.get(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_KEY}`
    // )
    // res.json({weather: weatherObj, address: data.results[0].formatted_address})

    res.json({
      weather: {
        time: 1556390927,
        summary: 'Mostly Cloudy',
        icon: 'partly-cloudy-day',
        nearestStormDistance: 6,
        nearestStormBearing: 154,
        precipIntensity: 0,
        precipProbability: 0,
        temperature: 57.12,
        apparentTemperature: 57.12,
        dewPoint: 29.01,
        humidity: 0.34,
        pressure: 1002.07,
        windSpeed: 12.35,
        windGust: 20.98,
        windBearing: 286,
        cloudCover: 0.67,
        uvIndex: 3,
        visibility: 10,
        ozone: 399.2,
        windDirection: 'NW',
        nearestStormDirection: 'SE',
        dateTime: '2019-04-27T18:48:47.000Z'
      },
      address: '55 W 92nd St, New York, NY 10025, USA'
    })
  } catch (error) {
    next(error)
  }
})
router.get('/:coords/forecast', async (req, res, next) => {
  try {
    const [latitude, longitude] = req.params.coords
      .split('_')
      .map(c => Number(c))

    // const weatherObj = await DarkSkyApi.loadForecast({
    //   latitude,
    //   longitude
    // })
    // res.json(weatherObj.daily.data[0])

    res.json({
      time: 1556337600,
      summary: 'Partly cloudy throughout the day.',
      icon: 'partly-cloudy-day',
      sunriseTime: 1556359245,
      sunsetTime: 1556408915,
      moonPhase: 0.77,
      precipIntensity: 0.003,
      precipIntensityMax: 0.0318,
      precipIntensityMaxTime: 1556352000,
      precipProbability: 0.95,
      precipType: 'rain',
      temperatureHigh: 58.89,
      temperatureHighTime: 1556398800,
      temperatureLow: 47,
      temperatureLowTime: 1556442000,
      apparentTemperatureHigh: 58.89,
      apparentTemperatureHighTime: 1556398800,
      apparentTemperatureLow: 47,
      apparentTemperatureLowTime: 1556442000,
      dewPoint: 35.3,
      humidity: 0.5,
      pressure: 1001.64,
      windSpeed: 11.17,
      windGust: 28.98,
      windGustTime: 1556402400,
      windBearing: 286,
      cloudCover: 0.59,
      uvIndex: 4,
      uvIndexTime: 1556377200,
      visibility: 9.67,
      ozone: 393.19,
      temperatureMin: 51.13,
      temperatureMinTime: 1556348400,
      temperatureMax: 58.89,
      temperatureMaxTime: 1556398800,
      apparentTemperatureMin: 51.13,
      apparentTemperatureMinTime: 1556348400,
      apparentTemperatureMax: 58.89,
      apparentTemperatureMaxTime: 1556398800,
      windDirection: 'NW',
      dateTime: '2019-04-27T04:00:00.000Z',
      sunriseDateTime: '2019-04-27T10:00:45.000Z',
      sunsetDateTime: '2019-04-27T23:48:35.000Z',
      temperatureMinDateTime: '2019-04-27T07:00:00.000Z',
      temperatureMaxDateTime: '2019-04-27T21:00:00.000Z',
      apparentTemperatureMinDateTime: '2019-04-27T07:00:00.000Z',
      apparentTemperatureMaxDateTime: '2019-04-27T21:00:00.000Z'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
