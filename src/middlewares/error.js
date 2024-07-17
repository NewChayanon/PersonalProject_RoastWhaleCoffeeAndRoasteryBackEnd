const Joi = require("joi");
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    err.statusCode = 401;
  }

  res.status(err.statusCode || 500).json({ message: err.message, field: err.field });
};

module.exports = errorMiddleware;
