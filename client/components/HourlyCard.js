import React from 'react'
import {unixToTime, roundedPercent} from '../utils'
import Icon from './Icon'

const HourlyCard = ({
  icon,
  time,
  temp,
  uvi,
  prob,
  summary,
  precipIntensity
}) => {
  return (
    <div className="hourly-item-container">
      <div> {unixToTime(time)} </div>
      <Icon icon={icon} />
      <div> {Math.floor(temp)}&deg;</div>
      <div> {summary}</div>
      <div> Chance of precip: {roundedPercent(prob)}%</div>
      <div> UV Index: {uvi}</div>
    </div>
  )
}

export default HourlyCard
