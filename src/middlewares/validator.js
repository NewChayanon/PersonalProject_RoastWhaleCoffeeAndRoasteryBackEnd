const {
  registerSchema,
  loginSchema,
} = require("./joi-validator.js/auth-validator");

exports.registerValidator = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
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
exports.changeAddressValidator = (req, res, next) => {};
exports.addProductValidator = (req, res, next) => {};
exports.updateOrderValidator = (req, res, next) => {};
