import React from 'react'

const Location = ({address, coords}) => {
  const [street, city, stateZip, country] = address.split(', ')
  return (
    <div>
      {address.length > 0 && (
        <span>
          {city}, {stateZip}
        </span>
      )}
      <br />
      <span id="coords">
        [{coords.split('_')[0].slice(0, 10)},{' '}
        {coords.split('_')[1].slice(0, 10)}]
      </span>
    </div>
  )
}

export default Location
