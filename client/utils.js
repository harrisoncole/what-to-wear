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

///set up service worker and push notifications

const publicVapidKey =
  'BJDGORYvRrDZRpFnb6rD9wGSblHu7FHN_s4q5GBdO0LUxsqu4NfnLXIEqvgFOWCSkiVcwN4LxvOV-1bIsFbbv7Y'

export async function registerSW() {
  if ('serviceworker' in navigator) {
    const register = await navigator.serviceWorker.register('/sw.js')
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {'content-type': 'application/json'}
    })
  } else {
    console.log('registration failure')
  }
}

//from web-push docs:
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
