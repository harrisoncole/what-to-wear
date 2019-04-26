import React, {useState} from 'react'
import {getCurrentWeather} from '../utils'

const Form = ({setWeather}) => {
  const [zipCode, setZipcode] = useState(10025)
  return (
    <form
      onSubmit={evt => {
        formSubmission(evt, setWeather, zipCode)
      }}
    >
      <label htmlFor="zip">Enter zip code</label>
      <input
        type="text"
        name="zip"
        onChange={e => setZipcode(e.target.value)}
      />
      <button type="submit">tell me something good</button>
    </form>
  )
}

async function formSubmission(event, setter, zipCode) {
  event.preventDefault()
  console.log('form submisson:')
  const current = await getCurrentWeather(zipCode)
  console.log('got weather:', current)
  setter(current)
}

export default Form
