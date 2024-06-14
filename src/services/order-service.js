const prisma = require("../models/prisma");

const orderService = {};

orderService.createOrder = (addressId, cartId, data) =>
  prisma.order.create({
    data: {
      address_id: addressId,
      cart_id: cartId,
      image: data.image,
      date: data.date,
      hour: data.hour,
      minute: data.minute,
    },
  });

orderService.shoppingList = (cartIdArray) =>
  prisma.order.findMany({
    where: { cart_id: { in: cartIdArray } },
    include: {
      cart: {
        include: {
          cart_items: {
            include: { product_and_size: { include: { product: true } } },
          },
        },
      },
    },
  });

orderService.updateStatusOrder = (orderId, status) =>
  prisma.order.update({ where: { id: orderId }, data: { status: status } });

orderService.fetchAllOrder = () =>
  prisma.order.findMany({
    include: {
      address: true,
      cart: {
        include: {
          cart_items: {
            include: { product_and_size: { include: { product: true } } },
          },
        },
      },
    },
  });

module.exports = orderService;
