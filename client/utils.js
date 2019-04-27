export function unixToTime(unixStr) {
  console.log('unix string:', unixStr)
  const date = new Date(unixStr * 1000)
  const hours = date.getHours()
  const minutes = '0' + date.getMinutes()
  return hours + ':' + minutes.substr(-2)
}

export function getLatitude() {
  return window.localStorage.getItem('lat')
}

export function getLongitude() {
  return window.localStorage.getItem('long')
}
