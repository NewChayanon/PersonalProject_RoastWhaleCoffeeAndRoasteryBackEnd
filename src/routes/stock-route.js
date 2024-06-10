const express= require('express')
const stockController = require('../controllers/stock-controller')
const { authenticate } = require('../middlewares/authenticate')
const { addProductValidator } = require('../middlewares/validator')
const { isAdmin } = require('../middlewares/isAdmin')
const stockRouter = express.Router()

// add product - Validation /Authentication
stockRouter.post('/add-product-coffee',authenticate,addProductValidator,isAdmin,stockController.addProduct)

// delete product - Authentication (soft delete)
stockRouter.delete('/remove-product/:productId',authenticate,isAdmin,stockController.deleteProduct)

// update status order - Validation /Authentication
stockRouter.patch('/order')
module.exports = stockRouter