const express = require("express");
const authRouter = express.Router();
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/validator");
const authController = require("../controllers/auth-controller");

// register - Validation
authRouter.post("/registers", registerValidator, authController.register);

// login - Validation / Token generate
authRouter.post("/logins", loginValidator, authController.login);



module.exports = authRouter;
