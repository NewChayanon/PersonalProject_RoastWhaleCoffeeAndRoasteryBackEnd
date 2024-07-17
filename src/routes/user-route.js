const express = require('express')
const { authenticate } = require('../middlewares/authenticate')
const userController = require('../controllers/user-controller')
const { changeAddressValidator, paymentValidator, addProductImageValidator } = require('../middlewares/validator')
const upload = require('../middlewares/upload')
const userRouter = express.Router()

// get user (Pass)
userRouter.get('/', userController.getUser)

// add product to cart - Authentication (Pass)
userRouter.post('/add-product/:productAndSizeId', userController.addProductToCart)

// quick-add (Pass)
userRouter.post('/cart/products/:productAndSizeId/quick-add', userController.quickAddProductToCart)

// delete product in cart - Authentication (Pass)
userRouter.delete('/cart/products/:cartItemId', userController.deleteProductToCart)

// change address - Validation /Authentication (Pass)
userRouter.post('/address', changeAddressValidator, userController.changeAddress)

// create order - Authentication (Pass)
userRouter.post('/checkout', paymentValidator, userController.CreateOrder)

// create order - update payment image (Pass)
userRouter.patch('/payment', upload.single("paymentImage"), addProductImageValidator, userController.updatePaymentImage)

// check status order - Authentication (Pass)
userRouter.get('/orders', userController.fetchShoppingList)

// fetch cart user (Pass)
userRouter.get("/cart", userController.cartUser)

module.exports = userRouter