const { boolean } = require("joi");
const cartService = require("../services/cart-service");
const { cart } = require("../models/prisma");
const cartItemService = require("../services/cart-item-service");
const addressService = require("../services/address-service");
const orderService = require("../services/order-service");
const userService = require("../services/user-service");
const productAndSizeService = require("../services/product-and-size-service");

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
      const addProductToCart = await cartItemService.addProductToCartItem(createCart.id, productAndSizeId, quantity);
    }
    if (haveCart) {
      const haveProductAndSize = await cartItemService.checkProductAndSize(haveCart.id, productAndSizeId);
      if (!haveProductAndSize) {
        const addProductToCart = await cartItemService.addProductToCartItem(haveCart.id, productAndSizeId, quantity);
      } else {
        const updateProductInCartItem = await cartItemService.updateProductInCartItem(quantity, haveProductAndSize.id);
      }
    }

    res.status(201).json({ msg: "add product successfully" });
  } catch (error) {
    next(error);
  }
};

userController.quickAddProductToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const productAndSizeId = +req.params.productAndSizeId;
    const { quantity } = req.body;
    const haveCart = await cartService.haveCart(user.id);

    const productId = await productAndSizeService.findProductId(productAndSizeId);
    const minSize = productId[0].id;

    if (!haveCart) {
      const createCart = await cartService.createCart(user.id);
      const addProductToCart = await cartItemService.addProductToCartItem(createCart.id, minSize, quantity);
    }
    if (haveCart) {
      const haveProductAndSize = await cartItemService.checkProductAndSize(haveCart.id, minSize);
      let updateQuantity = haveProductAndSize ? haveProductAndSize.quantity + 1 : quantity;

      if (!haveProductAndSize) {
        const addProductToCart = await cartItemService.addProductToCartItem(haveCart.id, minSize, updateQuantity);
      } else {
        const updateProductInCartItem = await cartItemService.updateProductInCartItem(updateQuantity, haveProductAndSize.id);
      }
    }

    res.status(201).json({ msg: "add product successfully" });
  } catch (error) {
    next(error);
  }
};

userController.deleteProductToCart = async (req, res, next) => {
  try {
    const cartItemId = +req.params.cartItemId;
    const user = req.user;
    const cartItem = await cartItemService.findCartItemAndCart(cartItemId);

    if (user.id != cartItem.carts.user_id) {
      return res.status(400).json({ msg: "You don't have cart" });
    }
    const deleteCartItem = await cartItemService.deleteProductInCartItem(cartItemId);
    return res.status(200).json({ meg: "delete successfully" });
  } catch (error) {
    next(error);
  }
};

userController.changeAddress = async (req, res, next) => {
  try {
    const { id } = req.user;
    const address = req.address;
    const haveAddress = await addressService.findAddressId(id);
    // if (haveAddress) {
    //   const updateAddress = await addressService.updateAddress(
    //     haveAddress.id,
    //     address
    //   );
    //   return res.status(201).json({ msg: "update address successfully" });
    // }
    const createAddress = await addressService.createAddress(id, address);
    res.status(200).json({ msg: "fetch successfully" });
  } catch (error) {
    next(error);
  }
};

userController.CreateOrder = async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    // address_id
    // (user.id = user_id(table address))
    const addressId = await addressService.findAddressId(user.id); // addressId.id

    // cart_id
    // (AND:[{user_id:user.id},{is_delete:false}])
    const cartId = await cartService.haveCart(user.id); // cartId.id

    // change status cart
    const isDelete = await cartService.isDelete(cartId.id);

    // create order
    const order = await orderService.createOrder(addressId.id, cartId.id, body);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

userController.updatePaymentImage = async (req, res, next) => {
  try {
    const paymentImage = req.file.path;
    const orderId = +req.body.orderId;
    const updatePayment = await orderService.updatePaymentImage(orderId, paymentImage);

    console.log(paymentImage, orderId);
    console.log("------->", updatePayment);
    res.status(200).json(paymentImage);
  } catch (error) {
    next(error);
  }
};

userController.fetchShoppingList = async (req, res, next) => {
  try {
    const { id } = req.user;
    const cartId = await cartService.checkStatus(id);

    const cartIdArray = cartId.map((el) => el.id);
    const fetchShoppingList = await orderService.shoppingList(cartIdArray);

    res.status(200).json(fetchShoppingList);
  } catch (error) {
    next(error);
  }
};

userController.cartUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const cartUser = await cartService.haveCart(id);
    if (!cartUser) {
      const createNewCart = await cartService.createCart(id);
      const cartItemUser = await cartItemService.findCartItemByCartId(createNewCart.id);
      return res.status(200).json(cartItemUser);
    }
    const cartItemUser = await cartItemService.findCartItemByCartId(cartUser.id);

    res.status(200).json(cartItemUser);
  } catch (error) {}
};

module.exports = userController;
