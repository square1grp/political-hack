var router = require('express').Router()
const candidates = require('./candidates')

router.use('/candidates', candidates)

module.exports = router