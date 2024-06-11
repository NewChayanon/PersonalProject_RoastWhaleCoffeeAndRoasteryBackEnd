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
    include: { address: true, cart: true },
    
  });

module.exports = orderService;
