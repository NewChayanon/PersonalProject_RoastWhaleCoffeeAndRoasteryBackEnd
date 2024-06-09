const express= require('express')
const stockController = require('../controllers/stock-controller')
const { authenticate } = require('../middlewares/authenticate')
const { addProductValidator } = require('../middlewares/validator')
const { isAdmin } = require('../middlewares/isAdmin')
const stockRouter = express.Router()

// add product
stockRouter.post('/add-product-coffee',authenticate,addProductValidator,isAdmin,stockController.addProduct)

module.exports = stockRouter