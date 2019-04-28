const path = require('path')
const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const webpush = require('web-push')
const compression = require('compression')
// const session = require('express-session')
const passport = require('passport')
const PORT = process.env.PORT || 8081
const app = express()
const socketio = require('socket.io')
const db = require('./db/cloudFirestoreInit')
module.exports = app

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

webpush.setVapidDetails(
  'mailto: test@test.com',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
)

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    //to update in future
    const user = {}
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET || 'my best friend is Cody',
  //     resave: false,
  //     saveUninitialized: false
  //   })
  // )
  // app.use(passport.initialize())
  // app.use(passport.session())

  // auth and api routes
  // app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  //push notification
  app.post('/subscribe', (req, res, next) => {
    //get push subscription object
    const subscription = req.body

    res.status(201).json({})

    //create payload
    const payload = JSON.stringify({title: 'Thanks for checking the weather!'})

    //Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(e => next(e))
  })

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  const server = app.listen(PORT, () => {
    console.log('Cloud cover on port ', PORT)
  })
  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

async function bootApp() {
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
