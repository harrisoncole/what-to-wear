import React from 'react'
import CreateIcon from './CreateIcon'
import Weather from './Weather'
import Forecast from './Forecast'
import Form from './Form'

const Container = ({
  forecast,
  setForecast,
  displayButton,
  setDisplayButton,
  setAddress,
  coords,
  address,
  profile
}) => {
  return (
    <div className="home-container">
      <div className="home-container-inner">
        <h3>Hello Naked Person.</h3>
        {!forecast.currently ? (
          <h2> I'm thinking, okay?</h2>
        ) : (
          <div>
            <Weather weather={forecast} address={address} coords={coords} />
            <Forecast
              forecast={forecast}
              currentTemp={forecast.currently.temperature}
              profile={profile}
            />
            <Form setForecast={setForecast} setAddress={setAddress} />
          </div>
        )}

        {displayButton && (
          <CreateIcon prompt={prompt} setDisplayButton={setDisplayButton} />
        )}
      </div>
    </div>
  )
}

export default Container
