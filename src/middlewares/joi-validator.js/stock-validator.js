const Joi = require("joi");

exports.addProduct = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  details: Joi.string().required(),
  popular: Joi.number().required(),
  category: Joi.string(),
  size: Joi.string(),
  price: Joi.number(),
  stock: Joi.number(),
  image: Joi.array().items(
    Joi.object({
      image: Joi.string(),
    })
  ),
});

exports.updateStatusOrder = Joi.object({
  status:Joi.string().required().trim()
})
