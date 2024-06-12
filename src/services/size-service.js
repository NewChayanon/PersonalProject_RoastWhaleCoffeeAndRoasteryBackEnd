const prisma = require("../models/prisma");

const sizeService = {};

sizeService.addProduct = (data) => {
  const { category, coffee, tool } = data;
  //   console.log(category, coffee, tool);
  if (category === "coffee") {
    const coffeeArray = coffee.map((el) => {
      obj = {};
      obj.size = el.size;
      return obj;
    });
    return prisma.size.createMany({ data: coffeeArray });
  }
  if (category === "tool") {
    // return prisma.size.create({ data: { size: tool.size } });
  }
};

sizeService.searchSizeCoffee = (coffee) => {
  const coffeeArray = coffee.map((el) => el.size);
  return prisma.size.findMany({ where: { size: { in: coffeeArray } } });
};

sizeService.searchSizeTool = (tool) => prisma.size.findFirst({where:{size:tool.size}})
module.exports = sizeService;
