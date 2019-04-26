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
router.get('/:coords/forecast', async (req, res, next) => {
  try {
    const [latitude, longitude] = req.params.coords
      .split('_')
      .map(c => Number(c))

    const weatherObj = await DarkSkyApi.loadForecast({
      latitude,
      longitude
    })
    res.json(weatherObj.daily.data[0])
  } catch (error) {
    next(error)
  }
})

module.exports = router
