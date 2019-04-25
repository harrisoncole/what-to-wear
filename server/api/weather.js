const router = require('express').Router()
const DarkSkyApi = require('dark-sky-api')
require('dotenv').config()
const cities = require('cities')
DarkSkyApi.apiKey = process.env.DARK_SKY_KEY
DarkSkyApi.proxy = true

router.get('/:city', async (req, res, next) => {
  try {
    const city = req.params.city
    const cityPos = cities.zipLookup(city)
    const weatherObj = await DarkSkyApi.loadCurrent(cityPos)
    res.json(weatherObj)
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
