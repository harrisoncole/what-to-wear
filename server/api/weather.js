const router = require('express').Router()
const DarkSkyApi = require('dark-sky-api')
const axios = require('axios')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
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

    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
        process.env.GOOGLE_MAPS_KEY
      }`
    )
    res.json({weather: weatherObj, address: data.results[0].formatted_address})
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
