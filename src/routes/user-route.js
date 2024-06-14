const express = require('express')
const { authenticate } = require('../middlewares/authenticate')
const userController = require('../controllers/user-controller')
const { changeAddressValidator, paymentValidator } = require('../middlewares/validator')
const userRouter = express.Router()

userRouter.get('/users',authenticate,userController.getUser)

// add product to cart - Authentication
userRouter.post('/add-product/:productAndSizeId',authenticate,userController.addProductToCart)


userRouter.post('/quick-add-product/:productAndSizeId',authenticate,userController.quickAddProductToCart)

// delete product in cart - Authentication
userRouter.delete('/remove/:cartItemId',authenticate,userController.deleteProductToCart)

// change address - Validation /Authentication
userRouter.post('/address',authenticate,changeAddressValidator,userController.changeAddress)

// create order - Authentication
userRouter.post('/check-out',authenticate,paymentValidator,userController.CreateOrder)

// check status order - Authentication
userRouter.get('/shopping-list',authenticate,userController.fetchShoppingList)

// fetch cart user
userRouter.get("/cart",authenticate,userController.cartUser)

module.exports = userRouter