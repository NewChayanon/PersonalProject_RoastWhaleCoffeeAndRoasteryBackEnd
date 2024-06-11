const Joi = require("joi");

exports.changeAddress = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  mobile: Joi.string().required().pattern(/^[0-9]{10}$/),
  country: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
  district: Joi.string().required().trim(),
  province: Joi.string().required().trim(),
  postcode: Joi.string().required().pattern(/^[0-9]{5}$/),
});
