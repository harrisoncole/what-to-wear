import React from 'react'

const User = ({button, setButton}) => {
  const handleChange = evt => {
    setButton(event.target.value)
  }

  return (
    <div className="profile-container">
      <h1>Set Profile Type: </h1>
      <form>
        <div className="profile-selector">
          <div>
            <input
              type="radio"
              id="avg"
              value="avg"
              checked={button === 'avg'}
              onChange={handleChange}
            />
            <label for="avg">Average</label>
          </div>
          <div>
            <input
              type="radio"
              id="hot"
              value="hot"
              checked={button === 'hot'}
              onChange={handleChange}
            />
            <label for="hot">Hot</label>
          </div>
          <div>
            <input
              type="radio"
              id="cold"
              value="cold"
              checked={button === 'cold'}
              onChange={handleChange}
            />
            <label for="cold">Cold</label>
          </div>
          <div>
            <input
              type="radio"
              id="shorts"
              value="shorts"
              checked={button === 'shorts'}
              onChange={handleChange}
            />
            <label for="shorts">24/7 Shorts Person</label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default User
