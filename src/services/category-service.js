const prisma = require("../models/prisma");

const categoryService = {};

categoryService.searchCategory = (categoryName) =>
  prisma.category.findFirst({ where: { name: categoryName } });

module.exports = categoryService;
