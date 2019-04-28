import React from 'react'
import {Link} from 'react-router-dom'

const Banner = () => {
  return (
    <h1 className="title">
      <span>
        <Link to="/" id="logo">
          {' '}
          What to Wear <i class="fas fa-globe-americas" />
        </Link>{' '}
      </span>
      <span id="tm">powered by Dark Sky</span>
    </h1>
  )
}

export default Banner
