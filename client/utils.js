import axios from 'axios'

export async function getWeekForecast(zip) {
  const {data} = await axios.get(`/api/weather/${zip}/weekly`)
  return data
}

export async function getCurrentWeather(zip) {
  const {data} = await axios.get(`/api/weather/${zip}`)
  return data
}

export async function getCoords() {
  const [lat, long] = await navigator.geolocation.getCurrentPosition(pos => {
    console.log('coords:', pos.coords.longitude, pos.coords.latitude)
    return [pos.coords.latitude, pos.coords.longitude]
  })
  return [lat, long]
}
