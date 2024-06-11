const express = require('express')
const productController = require('../controllers/product-controller')
const productRouter = express.Router()

productRouter.get('/coffee',productController.getCoffee)

//  fetch new product
productRouter.get("/new",productController.fetchNewProduct)

// fetch popular product
productRouter.get("/popular",productController.fetchPopularProduct)

// fetch info product
productRouter.get('/coffee/:productId',productController.fetchInfoProduct)

module.exports = productRouter