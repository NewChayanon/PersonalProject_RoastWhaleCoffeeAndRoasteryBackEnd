const express = require('express')
const { authenticate } = require('../middlewares/authenticate')
const userController = require('../controllers/user-controller')
const { changeAddressValidator } = require('../middlewares/validator')
const userRouter = express.Router()

userRouter.get('/users',authenticate,userController.getUser)

// add product to cart - Authentication
userRouter.post('/add-product/:productAndSizeId',authenticate,userController.addProductToCart)

// delete product in cart - Authentication
userRouter.delete('/remove/:cartItemId',authenticate,userController.deleteProductToCart)

// change address - Validation /Authentication
userRouter.patch('/address',authenticate,changeAddressValidator,userController.changeAddress)

// create order - Authentication
userRouter.post('/check-out',authenticate,userController.CreateOrder)

// check status order - Authentication
userRouter.get('/shopping-list',authenticate,userController.fetchShoppingList)

module.exports = userRouter