import React from 'react'
import Main from './components/Main'
// import {Navbar} from './components'
// import Routes from './routes'

const App = ({displayButton, deferredPrompt}) => {
  return (
    <div>
      <Main displayButton={displayButton} deferredPrompt={deferredPrompt} />
    </div>
  )
}

export default App
