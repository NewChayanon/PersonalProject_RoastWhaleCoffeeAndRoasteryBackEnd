const prisma = require("../models/prisma")

const sizeService = {}

sizeService.addProduct = (size) => prisma.size.create({data:{size:size}})


module.exports = sizeService