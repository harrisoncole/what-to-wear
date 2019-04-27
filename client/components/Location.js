import React from 'react'

const Location = ({address}) => {
  const [street, city, stateZip, country] = address.split(', ')
  return (
    <div>
      {address.length > 0 && (
        <span>
          {city}, {stateZip}
        </span>
      )}
      <br />
    </div>
  )
}

export default Location
