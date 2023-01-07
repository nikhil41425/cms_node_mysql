const router = require('express').Router()
const {generateReport,getPdf,getBills,deleteBill} = require('../controllers/bill.controller')
const {authToken} = require("../middlewares/authtoken")
const {checkToken} = require("../middlewares/chackToken")


router.post('/generateReport',authToken,generateReport)
router.post('/getPdf',authToken,getPdf)
router.get('/getBills',authToken,getBills)
router.delete('/deleteBill/:id',authToken,deleteBill)

module.exports = router