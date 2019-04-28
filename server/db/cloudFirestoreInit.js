const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(require('../../what-to-wear-hc.json'))
})

const db = admin.firestore()

var profilesRef = db.collection('profiles')

var setAvg = profilesRef.doc('avg').set({
  name: 'Average',
  offset: 0
})
var setHot = profilesRef.doc('hot').set({
  name: 'Hot',
  offset: 10
})
var setCold = profilesRef.doc('cold').set({
  name: 'Cold',
  offset: -10
})

var setShorts = profilesRef.doc('shorts').set({
  name: '24/7 Shorts Guy',
  clothing: 'shorts'
})

module.exports = db
