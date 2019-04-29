import React, {useState, useEffect} from 'react'
import HourlyCard from './HourlyCard'

const Hourly = ({forecast}) => {
  const [display, setDisplay] = useState(8)
  const [hourly, setHourly] = useState([])

  function changeEvent(evt) {
    setDisplay(event.target.value)
  }

  useEffect(
    () => {
      forecast.hourly && setHourly(forecast.hourly.data.slice(0, display))
    },
    [display]
  )

  return (
    <div className="hourly-container">
      <div className="hourly-header">
        <h1>Hourly forecast</h1>
        <label htmlFor="hours">hours displayed</label>
        <select onChange={evt => changeEvent(evt)} name="hours">
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="24">24</option>
        </select>
      </div>
      <div className="hourly-card-container">
        {hourly &&
          hourly.map(h => (
            <HourlyCard
              key={h.time}
              icon={h.icon}
              time={h.time}
              temp={h.temperature}
              uvi={h.uvIndex}
              prob={h.precipProbability}
              summary={h.summary}
              precipIntensity={h.precipIntensity}
            />
          ))}
      </div>
    </div>
  )
}

export default Hourly
