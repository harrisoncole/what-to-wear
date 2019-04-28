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
  address
}) => {
  return (
    <div className="home-container">
      <h1 className="title">
        <span>
          What to Wear <i class="fas fa-globe-americas" />{' '}
        </span>
        <span id="tm">powered by Dark Sky</span>
      </h1>
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
