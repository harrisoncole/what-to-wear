export function unixToTime(unixStr) {
  console.log('unix string:', unixStr)
  const date = new Date(unixStr * 1000)
  const hours = date.getHours()
  const minutes = '0' + date.getMinutes()
  return hours + ':' + minutes.substr(-2)
}
