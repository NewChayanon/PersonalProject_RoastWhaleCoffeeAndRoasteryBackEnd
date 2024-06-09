const {
  registerSchema,
  loginSchema,
} = require("./joi-validator.js/auth-validator");
const { addProduct } = require("./joi-validator.js/stock-validator");

exports.registerValidator = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    error.statusCode = 400
    return next(error)
  }
  req.input = value;
  next();
};

exports.loginValidator = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  req.input = value;
  next();
};
exports.addProductValidator = (req, res, next) => {
  const {value,error} = addProduct.validate(req.body)
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  req.input = value
  next()
};


exports.changeAddressValidator = (req, res, next) => {};
exports.updateOrderValidator = (req, res, next) => {};
