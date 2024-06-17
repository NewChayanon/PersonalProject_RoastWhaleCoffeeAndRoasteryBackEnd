const express = require('express')
const productController = require('../controllers/product-controller')
const productRouter = express.Router()

//  fetch all coffee
productRouter.get('/coffee',productController.getCoffee)

// fetch all tool
productRouter.get('/tool',productController.getTool)

//  fetch new product
productRouter.get("/new",productController.fetchNewProduct)

// fetch popular product
productRouter.get("/popular",productController.fetchPopularProduct)

// fetch info product
productRouter.get('/:productId',productController.fetchInfoProduct)

module.exports = productRouter