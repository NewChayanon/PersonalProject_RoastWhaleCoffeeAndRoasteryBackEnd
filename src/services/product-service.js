const prisma = require("../models/prisma");

const productService = {};

productService.searchCoffeeId = (coffeeName) =>prisma.product.findFirst({})

productService.getCoffee = () =>
  prisma.product.groupBy({
    by: ["name"],
    
    // where: {
    //   category_id: 1,
    // },
    
  });

productService.addProduct = (data) =>
  prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      details: data.details,
      popular: data.popular,
      category_id: data.categoryId,
      
      // price: data.price,
      // stock: data.stock,
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

// fetch new product (wait edit - groupBy)
productService.fetchNewProduct = () =>
  prisma.product.findMany({
    orderBy: { created_at: "desc" },
    take: 4,
    include: { image: true },
  });

// fetch popular product (wait edit - groupBy)
productService.fetchPopularProduct = () =>
  prisma.product.findMany({
    orderBy: { popular: "desc" },
    take: 4,
    include: { image: true },
  });

// fetch info product (wait edit)
productService.fetchInfoProduct = () => prisma.product.findFirst({});

module.exports = productService;
