const prisma = require("../models/prisma");
const cartItemService = {};

cartItemService.addProductToCartItem = (cartId, productId, quantity) =>
  prisma.cart_item.create({
    data: { cart_id: cartId, product_id: productId, quantity: quantity },
  });

cartItemService.deleteProductInCartItem = (cartItemId) =>
  prisma.cart_item.delete({ where: { id: cartItemId } });

module.exports = cartItemService;
