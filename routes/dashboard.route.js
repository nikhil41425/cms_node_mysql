const router = require('express').Router()
const {getDetails} = require('../controllers/dashboard.controller')
const {authToken} = require("../middlewares/authtoken")
const {checkToken} = require("../middlewares/chackToken")


router.get('/getDetails',authToken,getDetails)

module.exports = router