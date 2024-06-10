const prisma = require("../models/prisma");
const cartService = {};

cartService.haveCart = (userId) =>
  prisma.cart.findFirst({
    where: { AND: [{ user_id: userId }, { is_delete: false }] },
  });

cartService.createCart = (userId) => prisma.cart.create({data:{user_id:userId}}) 

module.exports = cartService;
