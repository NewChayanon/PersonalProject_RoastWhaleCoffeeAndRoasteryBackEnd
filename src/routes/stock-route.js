const express= require('express')
const stockController = require('../controllers/stock-controller')
const { authenticate } = require('../middlewares/authenticate')
const { addProductValidator, updateOrderValidator, editValidator, addProductImageValidator } = require('../middlewares/validator')
const { isAdmin } = require('../middlewares/isAdmin')
const upload = require('../middlewares/upload')
const stockRouter = express.Router()

// add product image
stockRouter.post('/add-product-image',upload.single("productImage"),addProductImageValidator,stockController.addProductImage)

// add product - Validation /Authentication
stockRouter.post('/add-product-coffee',addProductValidator,stockController.addProduct)

// delete product - Authentication (soft delete)
stockRouter.patch('/remove-product/:productId',stockController.deleteProduct)

// update status order - Validation /Authentication
stockRouter.patch('/order/:orderId',updateOrderValidator,stockController.updateStatusOrder)

// start server 
stockRouter.post('/generate-server',stockController.generateServer)

// fetch all order
stockRouter.get('/order-list',stockController.getAllOrder)

// edit product
stockRouter.patch('/edit-coffee-product',editValidator,stockController.editCoffeeProduct)

module.exports = stockRouter