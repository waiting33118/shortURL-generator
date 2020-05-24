const express = require('express')
const router = express.Router()
const home = require('./modules/homePage')

router.use('/', home)

module.exports = router
