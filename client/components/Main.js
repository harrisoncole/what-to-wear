import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Container from './Container'
import moment from 'moment'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import Hourly from './Hourly'
import User from './User'

import {getLatitude, getLongitude, getTime, compareTime} from '../utils'

const Main = () => {
  //STATE
  const [forecast, setForecast] = useState({})
  const [coords, setCoords] = useState('')
  const [displayButton, setDisplayButton] = useState(false)
  const [prompt, setPrompt] = useState({})
  const [address, setAddress] = useState('')
  const [button, setButton] = useState('avg')
  const [profile, setProfile] = useState({})

  //EFFECTS
  useEffect(
    () => {
      async function getProfileInfo(type) {
        const {data} = await axios.get(`/api/users/${type}`)
        setProfile(data)
      }

      getProfileInfo(button)
    },
    [button]
  )

  useEffect(() => {
    async function getCoords() {
      window.localStorage.setItem('time', JSON.stringify(moment()))
      await navigator.geolocation.getCurrentPosition(pos => {
        let current = pos.coords.latitude + '_' + pos.coords.longitude
        if (
          Math.floor(Number(getLatitude())) !==
            Math.floor(pos.coords.latitude) ||
          Math.floor(Number(getLongitude())) !==
            Math.floor(pos.coords.longitude)
        ) {
          window.localStorage.setItem('lat', pos.coords.latitude.toString())
          window.localStorage.setItem('long', pos.coords.longitude.toString())
          setCoords(current)
        }
      })
    }

    if (getLatitude() && getLongitude()) {
      let now = moment()
      let then = getTime()
      if (compareTime(now, then) > 10) {
        setCoords(getLatitude() + '_' + getLongitude())
        getCoords()
      } else if (coords.length === 0) {
        setCoords(getLatitude() + '_' + getLongitude())
      }
    } else {
      getCoords()
    }
  }, [])

  useEffect(
    () => {
      async function getCurrentWeather(coordStr) {
        const {data} = await axios.get(`/api/weather/${coordStr}/forecast`)
        setForecast(data.forecast)
        setAddress(data.address)
      }

      if (coords.length > 0) {
        getCurrentWeather(coords)
      }
    },
    [coords]
  )

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', evt => {
      evt.preventDefault()
      setPrompt(evt)
      setDisplayButton(true)
    })
  }, [])

  return (
    <Switch>
      <Route
        exact
        path="/current"
        component={() => (
          <Container
            forecast={forecast}
            address={address}
            coords={coords}
            setForecast={setForecast}
            setAddress={setAddress}
            displayButton={displayButton}
            setDisplayButton={setDisplayButton}
            profile={profile}
          />
        )}
      />
      <Route exact path="/hourly" component={Hourly} />
      <Route
        exact
        path="/user"
        component={() => <User button={button} setButton={setButton} />}
      />
      <Redirect from="/" to="/current" />
    </Switch>
  )
}

export default Main
