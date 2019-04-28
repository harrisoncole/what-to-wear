import React, {useState} from 'react'

const Form = ({onSubmit}) => {
  const [zipCode, setZipcode] = useState(10025)
  return (
    <form
      onSubmit={evt => {
        formSubmission(event, onSubmit, zipCode)
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

async function formSubmission(event, onSubmit, zipCode) {
  event.preventDefault()
  await onSubmit(zipCode)
}

export default Form
