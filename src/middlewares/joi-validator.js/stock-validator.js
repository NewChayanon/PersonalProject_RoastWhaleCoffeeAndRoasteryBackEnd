const Joi = require("joi");

exports.addProduct = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  details: Joi.string().required(),
  popular: Joi.number().required(),
  category: Joi.object({
    name: Joi.string().required(),
  }),
  product_type: Joi.array(),
  image: Joi.array()
});
