const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(require('../../what-to-wear-hc.json'))
})

const db = admin.firestore()

module.exports = db
