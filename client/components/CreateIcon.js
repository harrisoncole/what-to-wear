import React from 'react'

const CreateIcon = ({setDisplayButton, prompt}) => {
  return (
    <button
      type="button"
      onClick={() => {
        setDisplayButton(false)
        prompt.prompt()
        prompt.userChoice.then(result => {
          if (result.outcome === 'accepted') {
            console.log('accepted!')
          } else {
            console.log('dismissed!')
          }
          prompt = null
        })
      }}
    >
      Click me to install an icon
    </button>
  )
}

export default CreateIcon
