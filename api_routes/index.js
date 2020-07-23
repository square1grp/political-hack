var router = require('express').Router()
// includes all endpoints under /candidates endpoint
const candidates = require('./candidates')

// use "candidates" under "/candidates" api end points
router.use('/candidates', candidates)

module.exports = router