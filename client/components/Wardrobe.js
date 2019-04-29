/* eslint-disable complexity */
import React from 'react'

const Wardrobe = ({
  high,
  low,
  precipProb,
  uvIndex,
  currentTemp,
  precipType,
  profile
}) => {
  if (currentTemp > low) {
    low = currentTemp
  }
  let offset = profile.offset ? profile.offset : 0
  let umbrella = precipProb > 15 && precipType !== 'snow'
  let jacket = false
  let sungear = uvIndex > 5.9
  let top = 'tee shirt or dress or something light'
  let bottom =
    "shorts...or just skip the top and throw on a dress if that's your thing"

  if (high < 32 - offset) {
    jacket = 'parka'
    bottom = 'warm pants'
    top = 'sweater or hoodie'
    umbrella = false
  } else if (high < 40 - offset) {
    jacket = 'winter coat'
    bottom = 'pants'
    top = 'long-sleeved shirt or top'
  } else if (high < 50 - offset) {
    jacket = 'midweight jacket'
    bottom = 'pants'
    top = 'long-sleeved shirt or top'
  } else if (high < 60 - offset) {
    jacket = 'light jacket'
    bottom = 'pants'
    top = 'short sleeved top with a sweater'
  } else if (high < 65 - offset) {
    jacket = 'sweater or very light jacket'
    bottom = 'pants'
    top = 'short sleeved top'
  }

  return (
    <div className="clothing-recs">
      <h3> Here's what to wear: </h3>
      <ul>
        <li>
          I suggest a {top} and{' '}
          {profile.clothing === 'shorts'
            ? 'shorts. Because you love shorts'
            : bottom}.
        </li>
        {jacket ? (
          <li> You'll also want a {jacket} for this weather. </li>
        ) : (
          <li> No need for a jacket today! </li>
        )}
        {sungear && (
          <li>
            {' '}
            There's a high UV index today, so wear sunscreen or bring a hat!{' '}
          </li>
        )}
        {umbrella && <li> Bring an umbrella! </li>}
      </ul>
    </div>
  )
}

export default Wardrobe
