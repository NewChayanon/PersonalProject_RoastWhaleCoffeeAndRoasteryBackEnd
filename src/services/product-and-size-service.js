const prisma = require("../models/prisma");

const productAndSizeService = {};

productAndSizeService.addProduct = (prepareInfoCoffee) =>
  prisma.product_and_size.createMany({
    data: prepareInfoCoffee,
  });

productAndSizeService.prepareInfoCoffee = (coffee, sizeId, productId) => {
  const size = coffee.map((el) => el.size);
  const newSizeId = [];
  for (let element of size) {
    const positionSizeId = sizeId.find((el) => el.size == element);
    newSizeId.push(positionSizeId.id);
  }
  for (let i in coffee) {
    delete coffee[i].size;
    coffee[i]["size_id"] = newSizeId[i];
    coffee[i]["product_id"] = productId;
  }
  return coffee;
};

productAndSizeService.prepareInfoTool = (tool, sizeId, productId) => {
  delete tool.size;
  tool["size_id"] = sizeId;
  tool["product_id"] = productId;
  tool.price = +tool.price;
  tool.stock = +tool.stock;
  return tool;
};

productAndSizeService.findProductId = (productAndSizeId) =>
  prisma.product_and_size.findMany({
    where: { AND: [{ product_id: productAndSizeId }, { price: { not: 0 } }] },
    orderBy: { price: "asc" },
  });

productAndSizeService.editProductCoffee = (coffee) => {
  coffee.map(
    async (el) =>
      await prisma.product_and_size.update({
        where: { id: el.id },
        data: { price: +el.price, stock: +el.stock },
      })
  );
};

productAndSizeService.editProductTool = (tool) =>
  prisma.product_and_size.update({
    where: { id: tool.id },
    data: { price: +tool.price, stock: +tool.stock },
  });

module.exports = productAndSizeService;
