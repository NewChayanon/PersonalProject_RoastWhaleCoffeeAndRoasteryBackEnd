const express = require('express')
const { authenticate } = require('../middlewares/authenticate')
const userController = require('../controllers/user-controller')
const userRouter = express.Router()

userRouter.get('/users',authenticate,userController.getUser)

// add product to cart - Authentication
userRouter.post('/add-product/:productTypeId',authenticate,userController.addProductToCart)

// delete product in cart - Authentication
userRouter.delete('/remove/:cartItemId',authenticate,userController.deleteProductToCart)

module.exports = userRouter