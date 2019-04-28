/* eslint-disable complexity */
import React from 'react'

const Icon = ({icon}) => {
  switch (icon) {
    case 'clear-day':
      return <i class="fas fa-sun" />
    case 'clear-night':
      return <i class="far fa-moon" />
    case 'rain':
      return <i class="fas fa-cloud-showers-heavy" />
    case 'snow':
      return <i class="fas fa-snowflake" />
    case 'wind':
      return <i class="fas fa-wind" />
    case 'fog':
      return <i class="fas fa-cloud" />
    case 'cloudy':
      return <i class="fas fa-cloud" />

    case 'partly-cloudy-day':
      return <i class="fas fa-cloud-sun" />
    case 'partly-cloudy-night':
      return <i class="fas fa-cloud-moon" />

    case 'sleet':
      return <i class="fas fa-meteor" />
    default:
      return <i class="fas fa-cloud-sun" />
  }
}

export default Icon
