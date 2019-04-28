let cacheName = 'cache-v12'
const resourcesToPrecache = [
  'offline.html',
  'main.css',
  'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
]

self.addEventListener('install', event => {
  console.log('Install event!')
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        return cache.addAll(resourcesToPrecache)
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  console.log('Activate event!')
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            console.log('[SericeWorker] removing old cache', key)
            return caches.delete(key)
          }
        })
      )
    )
  )
})

self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate') return

  event.respondWith(
    fetch(event.request).catch(() => {
      console.log('fetch intercepted for :', event.request.url)
      return caches.open(cacheName).then(cache => cache.match('offline.html'))
      //can also match with e.request if all files are in the cache and will return the requested file
    })
  )
})

self.addEventListener('push', event => {
  const data = event.data.json()
  console.log('push received')
  self.registration.showNotification(data.title, {
    body: 'notifed by What To Wear!',
    icon: '/images/icons/icon-72x72.png'
  })
})
