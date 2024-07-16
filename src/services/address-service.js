const prisma = require("../models/prisma");

const addressService = {};

addressService.createAddress = (userId, data) =>
  prisma.address.create({
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
      mobile: data.mobile,
      country: data.country,
      address: data.address,
      district: data.district,
      province: data.province,
      postcode: data.postcode,
      user_id: userId,
    },
  });

addressService.updateAddress = (addressId, data) =>
  prisma.address.update({
    where: { id: addressId },
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
      mobile: data.mobile,
      country: data.country,
      address: data.address,
      district: data.district,
      province: data.province,
      postcode: data.postcode,
    },
  });

addressService.findAddressId = (userId) =>
  prisma.address.findFirst({
    orderBy: { created_at: "desc" },
    where: { user_id: userId },
    take: 1,
  });


addressService.statusOrder = (userId) => prisma.address.findMany({ where: { user_id: userId }, include: { order: true } });

module.exports = addressService;
