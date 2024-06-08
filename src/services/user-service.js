const prisma = require("../models/prisma");

const userService = {};

userService.findEmail = (email) => prisma.user.findFirst({ where: { email } });

userService.createUser = (data) => prisma.user.create({ data });

userService.findUserId = (id) => prisma.user.findUnique({ where: { id } });

module.exports = userService;
