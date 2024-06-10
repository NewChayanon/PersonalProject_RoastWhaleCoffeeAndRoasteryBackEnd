const { boolean } = require("joi");
const cartService = require("../services/cart-service");
const { cart } = require("../models/prisma");
const cartItemService = require("../services/cart-item-service");

const userController = {};

userController.getUser = (req, res) => {
  res.json({ user: req.user });
};

// add product in cart
userController.addProductToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = +req.params.productTypeId;
    const body = req.body
    const haveCart = await cartService.haveCart(user.id);
   
    if (!haveCart) {
      const createCart = await cartService.createCart(user.id);
      const addProductToCart = await cartItemService.addProductToCartItem(createCart.id,productId,body.quantity)
    } else {
      const addProductToCart = await cartItemService.addProductToCartItem(haveCart.id,productId,body.quantity)
    }

    // console.log(haveCart);
    res.status(201).json({ msg: "add product successfully" });
  } catch (error) {
    next(error);
  }
};

// delete product in cart
userController.deleteProductToCart = async (req, res, next) => {
  try {
    const cartItemId = +req.params.cartItemId
    const deleteCartItem = await cartItemService.deleteProductInCartItem(cartItemId)
    console.log(deleteCartItem)
    res.status(200).json({meg:"delete successfully"})
  } catch (error) {
    next(error)
  }
};

module.exports = userController;
