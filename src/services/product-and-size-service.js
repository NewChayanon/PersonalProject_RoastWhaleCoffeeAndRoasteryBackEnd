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
  return tool
};

module.exports = productAndSizeService;
