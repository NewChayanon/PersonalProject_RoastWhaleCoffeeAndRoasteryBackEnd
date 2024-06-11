const { date } = require("joi");
const prisma = require("../models/prisma");

const productAndSizeService = {};

productAndSizeService.addProduct = (sizeId, productId, data) =>
  prisma.product_and_size.create({
    data: {
      size_id: sizeId,
      product_id: productId,
      price: data.price,
      stock: data.stock,
    },
  });

module.exports = productAndSizeService;
