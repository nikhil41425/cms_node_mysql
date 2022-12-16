const {addCategory,getCategory,updateCategory} = require("../controllers/category.controller")

const router = require('express').Router()

router.post("/addCategory",addCategory)
router.get("/getCategory",getCategory)
router.patch("/updateCategory",updateCategory)


module.exports = router