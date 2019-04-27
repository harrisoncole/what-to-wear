import React from 'react'

const Wardrobe = ({high, low, cloudCover, precipProb}) => {
  const umbrella = precipProb > 20
  const parka = low < 32
}

export default Wardrobe
