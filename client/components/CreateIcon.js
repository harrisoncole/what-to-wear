import React from 'react'

const CreateIcon = ({deferredPrompt}) => {
  return (
    <button type="button" onClick={() => onClick(deferredPrompt)}>
      Click me to install an icon
    </button>
  )
}

function onClick(deferredPrompt) {
  deferredPrompt.prompt()
  deferredPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt')
    }
    deferredPrompt = null
  })
}

export default CreateIcon
