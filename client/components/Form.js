import React, {useState} from 'react'
import axios from 'axios'

const Form = ({setForecast, setAddress}) => {
  const [zipCode, setZipcode] = useState(11803)
  return (
    <form
      className="zip-search"
      onSubmit={evt => {
        formSubmission(evt, setForecast, setAddress, zipCode)
      }}
    >
      <label htmlFor="zip">Enter another zip code</label>
      <input
        id="zip"
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
  document.getElementById('zip').value = ''
}

export default Form
