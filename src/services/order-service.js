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

orderService.shoppingList = async (cartId) => prisma.order.findMany({where:{cart_id:2}})
//   await cartId.map((el) =>
//     prisma.order.findUnique({ where: { cart_id: el.id } })
//   );

module.exports = orderService;
