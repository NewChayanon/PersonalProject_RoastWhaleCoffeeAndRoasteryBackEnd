const express= require('express')
const stockController = require('../controllers/stock-controller')
const { authenticate } = require('../middlewares/authenticate')
const { addProductValidator, updateOrderValidator } = require('../middlewares/validator')
const { isAdmin } = require('../middlewares/isAdmin')
const stockRouter = express.Router()

// add product - Validation /Authentication
stockRouter.post('/add-product-coffee',authenticate,addProductValidator,isAdmin,stockController.addProduct)

// delete product - Authentication (soft delete)
stockRouter.delete('/remove-product/:productId',authenticate,isAdmin,stockController.deleteProduct)

// update status order - Validation /Authentication
stockRouter.patch('/order/:orderId',authenticate,updateOrderValidator,isAdmin,stockController.updateStatusOrder)

// start server 
stockRouter.post('/generate-server',authenticate,isAdmin,stockController.generateServer)

// fetch all order
stockRouter.get('/order-list',authenticate,isAdmin,stockController.getAllOrder)

module.exports = stockRouter