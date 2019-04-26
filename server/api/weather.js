const router = require('express').Router()
const DarkSkyApi = require('dark-sky-api')
require('dotenv').config()
DarkSkyApi.apiKey = process.env.DARK_SKY_KEY
DarkSkyApi.proxy = true

const zipNotFound = new Error('zip code not found')
zipNotFound.status = 404

router.get('/:coords', async (req, res, next) => {
  try {
    const [latitude, longitude] = req.params.coords
      .split('_')
      .map(c => Number(c))

    const weatherObj = await DarkSkyApi.loadCurrent({
      latitude,
      longitude
    })
    res.json(weatherObj)
  } catch (error) {
    next(error)
  }
})

router.post('/weekly', async (req, res, next) => {
  try {
    if (req.body.lat && req.body.long) {
      const weatherObj = await DarkSkyApi.loadForecast({
        latitude: req.body.lat,
        longitude: req.body.long
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
