const {userRegister,userLogin,forgetPassword,changePassword,getUsers} = require('../controllers/user.controller')
const {authToken} = require("../middlewares/authtoken")
const {checkToken} = require("../middlewares/chackToken")
const {addUserValidation} = require("../middlewares/validation")
const router = require('express').Router()

router.post('/register',addUserValidation,userRegister)
router.post('/login',userLogin)
router.post('/forgetPassword',authToken,forgetPassword)
router.post('/changePassword',authToken,changePassword)
router.get('/getUsers',authToken,checkToken,getUsers)

module.exports = router
