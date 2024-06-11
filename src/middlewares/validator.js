const {
  registerSchema,
  loginSchema,
} = require("./joi-validator.js/auth-validator");
const {
  addProduct,
  updateStatusOrder,
} = require("./joi-validator.js/stock-validator");
const { changeAddress } = require("./joi-validator.js/user-validator");

exports.registerValidator = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    error.statusCode = 400;
    return next(error);
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
  const { value, error } = addProduct.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  req.input = value;
  next();
};

// address - validate
exports.changeAddressValidator = (req, res, next) => {
  const { value, error } = changeAddress.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  req.address = value;
  next();
};

// update status order
exports.updateOrderValidator = (req, res, next) => {
  const { value, error } = updateStatusOrder.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { status } = value;
  
  if (status != "PENDING" && status != "SUCCESSED" && status != "FAILED") {
    return res.status(400).json({ msg: "status invalid" });
  }
  req.order = value;
  next();
};
