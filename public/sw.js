let cacheName = 'cache-v1'
const resourcesToPrecache = ['offline.html', 'style.css']

self.addEventListener('install', event => {
  console.log('Install event!')
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(resourcesToPrecache)
    })
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
      return caches.open(cacheName).then(cache => cache.match(event.request))
    })
  )
})

// console.log('Fetch intercepted for:', event.request.url)
// event.respondWith(
//   caches.match(event.request).then(cachedResponse => {
//     return cachedResponse || fetch(event.request)
//     })
//   )
// })
