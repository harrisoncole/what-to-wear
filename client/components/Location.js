import React from 'react'

const Location = ({address}) => {
  const [
    streetOrCity,
    cityOrStateZip,
    stateZipOrCountry,
    countryOrUndefined
  ] = address.split(', ')
  return (
    <div>
      {address.length > 0 && (
        <span>
          {countryOrUndefined
            ? `${cityOrStateZip}, ${stateZipOrCountry}`
            : `${streetOrCity}, ${cityOrStateZip}`}
        </span>
      )}
      <br />
    </div>
  )
}

export default Location
