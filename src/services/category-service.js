const prisma = require("../models/prisma");

const categoryService = {};

categoryService.searchCategory = (categoryName) =>
  prisma.category.findFirst({ where: { name: categoryName } });

categoryService.generateServer = (category) =>
  prisma.category.createMany({ data: category });

module.exports = categoryService;
