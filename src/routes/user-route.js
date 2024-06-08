const express = require('express')
const { authenticate } = require('../middlewares/authenticate')
const userController = require('../controllers/user-controller')
const userRouter = express.Router()

userRouter.get('/users',authenticate,userController.getUser)

module.exports = userRouter