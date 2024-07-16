const prisma = require("../models/prisma");
const cartService = {};

cartService.haveCart = (userId) =>
  prisma.cart.findFirst({
    where: { AND: [{ user_id: userId }, { is_delete: false }] },
  });

cartService.checkStatus = (userId) =>
  prisma.cart.findMany({
    where: { AND: [{ user_id: userId }, { is_delete: true }] },
  });

cartService.createCart = (userId) => prisma.cart.create({ data: { user_id: userId } });

cartService.isDelete = (cartId) => prisma.cart.update({ where: { id: cartId }, data: { is_delete: true } });

module.exports = cartService;
