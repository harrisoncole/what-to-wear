import moment from 'moment'

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

export function getTime() {
  return JSON.parse(window.localStorage.getItem('time'))
}

export function compareTime(now, then) {
  return moment.duration(now.diff(then))._data.minutes
}

export function avgXHrPctMetric(hourlyArr, hrs, metric) {
  let avg =
    hourlyArr
      .slice(0, hrs)
      .map(hr => hr[metric])
      .reduce((accum, current) => current + accum, 0) / hrs

  return Math.floor(avg * 100)
}

export function roundedPercent(decimal) {
  return Math.floor(decimal * 100)
}

export function nextXHrs(dailyArr, numHrs, metric = 'all') {
  return dailyArr
    .slice(0, numHrs)
    .map(hr => (metric === 'all' ? hr : hr[metric]))
}

export function maxMetric(dailyArr, metric) {
  const grandMax = dailyArr.reduce(
    (max, current) => {
      return max[metric] > current[metric] ? max : current
    },
    {[metric]: 0}
  )

  return [unixToTime(grandMax.time), grandMax[metric]]
}

export function minMetric(dailyArr, metric) {
  const grandMin = dailyArr.reduce(
    (min, current) => {
      return min[metric] > current[metric] ? current : min
    },
    {[metric]: 200}
  )

  return [unixToTime(grandMin.time), grandMin[metric]]
}
