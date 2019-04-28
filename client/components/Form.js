import React, {useState} from 'react'
import axios from 'axios'

const Form = ({setForecast, setAddress}) => {
  const [zipCode, setZipcode] = useState(10025)
  return (
    <form
      onSubmit={evt => {
        formSubmission(evt, setForecast, setAddress, zipCode)
      }}
    >
      <label htmlFor="zip">Enter another zip code</label>
      <input
        type="text"
        name="zip"
        onChange={e => setZipcode(e.target.value)}
      />
      <button type="submit">Get that weather</button>
    </form>
  )
}

async function formSubmission(event, setForecast, setAddress, zipCode) {
  event.preventDefault()
  const {data} = await axios.get(`/api/weather/${zipCode}`)
  setForecast(data.forecast)
  setAddress(data.address)
}

export default Form
