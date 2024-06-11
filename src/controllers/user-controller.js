const { boolean } = require("joi");
const cartService = require("../services/cart-service");
const { cart } = require("../models/prisma");
const cartItemService = require("../services/cart-item-service");
const addressService = require("../services/address-service");

const userController = {};

userController.getUser = (req, res) => {
  res.json({ user: req.user });
};

// add and update - product in cart
userController.addProductToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const productAndSizeId = +req.params.productAndSizeId;
    const { quantity } = req.body;
    const haveCart = await cartService.haveCart(user.id);

    if (!haveCart) {
      const createCart = await cartService.createCart(user.id);
      const addProductToCart = await cartItemService.addProductToCartItem(
        createCart.id,
        productAndSizeId,
        quantity
      );
    }
    if (haveCart) {
      const haveProductAndSize = await cartItemService.checkProductAndSize(
        haveCart.id,
        productAndSizeId
      );
      if (!haveProductAndSize) {
        const addProductToCart = await cartItemService.addProductToCartItem(
          haveCart.id,
          productAndSizeId,
          quantity
        );
      } else {
        const updateProductInCartItem =
          await cartItemService.updateProductInCartItem(
            quantity,
            haveProductAndSize.id
          );
      }
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
    const cartItemId = +req.params.cartItemId;
    const user = req.user;
    const cartItem = await cartItemService.findCartItemAndCart(cartItemId);

    if (user.id != cartItem.carts.user_id) {
      return res.status(400).json({ msg: "You don't have cart" });
    }
    const deleteCartItem = await cartItemService.deleteProductInCartItem(
      cartItemId
    );
    return res.status(200).json({ meg: "delete successfully" });
  } catch (error) {
    next(error);
  }
};

// change address
userController.changeAddress = async (req, res, next) => {
  try {
    const { id } = req.user;
    const address = req.address;
    const haveAddress = await addressService.findAddressId(id);
    if (haveAddress) {
      const updateAddress = await addressService.updateAddress(
        haveAddress.id,
        address
      );
      return res.status(201).json({ msg: "update address successfully" });
    }
    const createAddress = await addressService.createAddress(id, address);
    res.status(200).json({ msg: "fetch successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
