const {addProduct,getProduct,getProductByCategoryId,getProductById,updateProduct,updateProductStatus,deleteProduct} = require('../controllers/product.controller')

const router = require('express').Router()

router.post('/addProduct',addProduct)
router.get('/getProduct',getProduct)
router.get('/getProductByCategoryId/:id',getProductByCategoryId)
router.get('/getProductById/:id',getProductById)
router.patch('/updateProduct',updateProduct)
router.patch('/updateProductStatus',updateProductStatus)
router.delete('/deleteProduct',deleteProduct)

module.exports = router