/* eslint-disable complexity */
import React from 'react'

const Wardrobe = ({
  high,
  low,
  precipProb,
  precipType,
  uvIndex,
  currentTemp
}) => {
  if (currentTemp > low) {
    low = currentTemp
  }

  let umbrella = precipProb > 15 && precipType !== 'snow'
  let jacket = false
  let sungear = uvIndex > 5.9

  if (high < 32) {
    jacket = 'parka'
    umbrella = false
  } else if (high < 40) {
    jacket = 'winter coat'
  } else if (high < 50) {
    jacket = 'midweight jacket'
  } else if (high < 60) {
    jacket = 'light jacket'
  } else if (high < 65) {
    jacket = 'sweater or very light jacket'
  }

  return (
    <div>
      <h3> Here are my thoughts on clothes: </h3>
      {umbrella && <div> Bring an umbrella! </div>}
      {jacket ? (
        <div> You'll want a {jacket} for this weather. </div>
      ) : (
        <div> No need for a jacket today! </div>
      )}
      {sungear && (
        <div>
          {' '}
          There's a high UV index today, so wear sunscreen or bring a hat!{' '}
        </div>
      )}
    </div>
  )
}

export default Wardrobe
