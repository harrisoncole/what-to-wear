const router = require('express').Router()
const db = require('../db/cloudFirestoreInit')

module.exports = router

const noDoc = new Error('document does not exist')

router.get('/:profile', async (req, res, next) => {
  const profiles = db.collection('profiles').doc(req.params.profile)
  let getProfile = profiles
    .get()
    .then(doc => {
      if (!doc.exists) {
        next(noDoc)
      } else {
        res.json(doc.data())
      }
    })
    .catch(e => next(e))
})
