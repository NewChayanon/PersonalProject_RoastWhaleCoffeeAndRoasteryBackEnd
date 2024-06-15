const { size_type } = require("@prisma/client");
const prisma = require("../models/prisma");

const productService = {};

//  fetch all coffee
productService.getCoffee = () =>
  prisma.product.findMany({
    where: { AND: [{ category_id: 1 }, { is_delete: false }] },
    include: {
      image: { orderBy: { created_at: "desc" } },
      product_and_size: { include: { size: true } },
    },
  });

productService.getTool = () =>
  prisma.product.findMany({
    where: { AND: [{ category_id: 2 }, { is_delete: false }] },
    include: { product_and_size: { include: { size: true } } },
  });

productService.searchCoffeeId = (coffeeName) => prisma.product.findFirst({});

productService.addProduct = (data) =>
  prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      details: data.details,
      popular: data.popular,
      category_id: data.categoryId,
    },
  });

productService.addImage = (productImage, product_id) =>
  prisma.image.create({ data: { image: productImage, product_id } });

productService.deleteProduct = (productId) =>
  prisma.product.update({
    data: { is_delete: true },
    where: { id: productId },
  });

// fetch new product
productService.fetchNewProduct = () =>
  prisma.product.findMany({
    where: { is_delete: false },
    orderBy: { created_at: "desc" },
    take: 4,
    include: {
      image: true,
      category: true,
      product_and_size: { include: { size: true } },
    },
  });

// fetch popular product
productService.fetchPopularProduct = () =>
  prisma.product.findMany({
    orderBy: { popular: "desc" },
    take: 4,
    include: { image: true },
  });

// fetch info product
productService.fetchInfoProduct = (productId) =>
  prisma.product.findFirst({
    where: { id: productId },
    include: { product_and_size: true },
  });

productService.updateProductById = (productId, name, description, details) =>
  prisma.product.update({
    where: { id: productId },
    data: { name, description, details },
  });

module.exports = productService;
