import React from 'react'
import {unixToTime} from '../utils';
import Icon from './Icon'

const HourlyCard = ({icon, time, temp, uvi, prob, summary, precipIntensity}) => {
  return <div className="hourly-container">
      <Icon icon={icon} />
  </div>
}

export default HourlyCard
