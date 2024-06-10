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
      type: data.type,
      price: data.price,
      stock: data.stock,
    },
  });

productService.addImage = (data, product_id) =>
  data.map(
    async (el) =>
      await prisma.image.create({ data: { image: el.image, product_id } })
  );

productService.deleteProduct = (productId) =>
  prisma.product.update({
    data: { is_delete: true },
    where: { id: productId },
  });
module.exports = productService;
