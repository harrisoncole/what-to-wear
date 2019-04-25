const router = require('express').Router()
const DarkSkyApi = require('dark-sky-api')
require('dotenv').config()
const cities = require('cities')
DarkSkyApi.apiKey = process.env.DARK_SKY_KEY
DarkSkyApi.proxy = true

const zipNotFound = new Error('zip code not found')
zipNotFound.status = 404

router.get('/:zip/weekly', async (req, res, next) => {
  try {
    const zip = Number(req.params.zip)
    const cityPos = cities.zip_lookup(zip)
    if (cityPos) {
      const weatherObj = await DarkSkyApi.loadForecast({
        latitude: 42.3601,
        longitude: -71.0589
      })
      res.json(weatherObj)
    } else {
      next(zipNotFound)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:zip', async (req, res, next) => {
  try {
    const zip = Number(req.params.zip)
    const cityPos = cities.zip_lookup(zip)
    if (cityPos) {
      const weatherObj = await DarkSkyApi.loadCurrent({
        latitude: 42.3601,
        longitude: -71.0589
      })
      res.json(weatherObj)
    } else {
      next(zipNotFound)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router

// const city = cities.zipLookup(10025)
// const position = {latitude: city.latitude, longitude: city.longitude}
// DarkSkyApi.loadCurrent(position).then(result =>
//   console.log("todoay's weather:", result)
// )
