import React from 'react'
import Main from './components/Main'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import {registerSW} from './utils'
// import Routes from './routes'

export const pushSubscription = registerSW()

const App = () => {
  return (
    <div>
      <Banner />
      <Main />
      <Navbar />
    </div>
  )
}

export default App
