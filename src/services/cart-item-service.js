const prisma = require("../models/prisma");
const { connect } = require("../routes/stock-route");
const cartService = require("./cart-service");
const cartItemService = {};

cartItemService.addProductToCartItem = (cartId, productAndSizeId, quantity) =>
  prisma.cart_item.create({
    data: {
      cart_id: cartId,
      product_and_size_id: productAndSizeId,
      quantity: quantity,
    },
  });

cartItemService.deleteProductInCartItem = (cartItemId) =>
  prisma.cart_item.delete({
    where: { id: cartItemId },
  });

cartItemService.checkProductAndSize = (cartId, productAndSizeId) =>
  prisma.cart_item.findFirst({
    where: {
      AND: [{ cart_id: cartId }, { product_and_size_id: productAndSizeId }],
    },
  });

cartItemService.updateProductInCartItem = (quantity, cartItemId) =>
  prisma.cart_item.update({
    where: { id: cartItemId },
    data: { quantity: quantity },
  });

cartItemService.findCartItemAndCart = (cartItemId) =>
  prisma.cart_item.findUnique({
    where: { id: cartItemId },
    include: { carts: true },
  });

cartItemService.findCartItemByCartId = (cartId) =>
  prisma.cart_item.findMany({
    where: { cart_id: cartId },
    include: {
      product_and_size: {
        include: {
          product: { include: { image: { orderBy: { created_at: "desc" } } } },
        },
      },
    },
  });

module.exports = cartItemService;
