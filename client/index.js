import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import history from './history'
import App from './app'

// establishes socket connection
// import './socket'

let deferredPrompt
let displayButton

window.addEventListener('beforeinstallprompt', evt => {
  evt.preventDefault()
  deferredPrompt = evt
  displayButton = true
})

ReactDOM.render(
  <Router history={history}>
    <App displayButton={displayButton} deferredPrompt={deferredPrompt} />
  </Router>,
  document.getElementById('app')
)
