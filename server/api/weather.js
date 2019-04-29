const router = require('express').Router()
const DarkSkyApi = require('dark-sky-api')
const axios = require('axios')

let GOOGLE_MAPS_KEY

DarkSkyApi.apiKey = process.env.DARK_SKY_KEY
GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY

DarkSkyApi.proxy = true

const zipNotFound = new Error('zip code not found')
zipNotFound.status = 404

router.get('/:zip', async (req, res, next) => {
  try {
    let zip = req.params.zip
    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zip}&key=${GOOGLE_MAPS_KEY}`
    )

    if (data.status !== 'OK') {
      next(zipNotFound)
    } else {
      const coords = data.results[0].geometry.location
      const weatherObj = await DarkSkyApi.loadItAll('minutely', {
        latitude: coords.lat,
        longitude: coords.lng
      })
      res.json({
        forecast: weatherObj,
        address: data.results[0].formatted_address
      })
    }
  } catch (error) {
    next(error)
  }
})
router.get('/:coords/forecast', async (req, res, next) => {
  try {
    const [latitude, longitude] = req.params.coords
      .split('_')
      .map(c => Number(c))

    const weatherObj = await DarkSkyApi.loadItAll('minutely', {
      latitude,
      longitude
    })

    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_KEY}`
    )
    res.json({forecast: weatherObj, address: data.results[0].formatted_address})
  } catch (error) {
    next(error)
  }
})

module.exports = router
