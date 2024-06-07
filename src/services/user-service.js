const prisma = require("../models/prisma");

const userService = {};


userService.findEmail = (email) => prisma.user.findFirst({ where: { email:email } });

userService.createUser = (data) => prisma.user.create({ data });

module.exports = userService;
