const express = require('express')
const productController = require('../controllers/product-controller')
const productRouter = express.Router()

//  fetch new product
productRouter.get("/new",productController.fetchNewProduct)



module.exports = productRouter