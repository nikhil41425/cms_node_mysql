const router = require('express').Router()
const {generateReport} = require('../controllers/bill.controller')
const {authToken} = require("../middlewares/authtoken")
const {checkToken} = require("../middlewares/chackToken")


router.post('/generateReport',authToken,generateReport)

module.exports = router