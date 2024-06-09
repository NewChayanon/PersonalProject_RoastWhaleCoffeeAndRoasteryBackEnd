const prisma = require("../models/prisma");

const productService = {};

productService.addProduct = (data) =>
  prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      details: data.details,
      popular: data.popular,
      category: {
        create: {
          name: data.category.name,
        },
      },
    },
  });

productService.addProductType = (data, product_id) =>
  data.map(
    async (el) =>
      await prisma.product_type.create({
        data: { name: el.size, price: el.price, stock: el.stock, product_id },
      })
  );

productService.addImage = (data, product_id) =>
  data.map(
    async (el) =>
      await prisma.image.create({ data: { image: el.image, product_id } })
  );

module.exports = productService;
