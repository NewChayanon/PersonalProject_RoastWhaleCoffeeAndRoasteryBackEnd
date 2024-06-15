const Joi = require("joi");

exports.addProduct = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  details: Joi.string().required(),
  popular: Joi.number().required(),
  category: Joi.string(),
  coffee: Joi.array().items(
    Joi.object({
      size: Joi.string().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
    })
  ),
  tool: Joi.object().required(),
  image: Joi.array().items(
    Joi.object({
      image: Joi.string(),
    })
  ),
});

exports.updateStatusOrder = Joi.object({
  status: Joi.string().required().trim(),
});

exports.payment = Joi.object({
  image: Joi.string().required(),
  date: Joi.string().required(),
  hour: Joi.string().required(),
  minute: Joi.string().required(),
});

exports.editProduct = Joi.object({
  id:Joi.number(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  details: Joi.string().required(),
  popular: Joi.number().required(),
  category: Joi.string(),
  coffee: Joi.array().items(
    Joi.object({
      id:Joi.number(),
      size: Joi.string().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
    })
  ),
  tool: Joi.object({
    id:Joi.number(),
    size: Joi.string(),
    price: Joi.number(),
    stock: Joi.number(),
  }),
});