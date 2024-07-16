const express = require("express");
const authRouter = express.Router();
const { registerValidator, loginValidator } = require("../middlewares/validator");
const authController = require("../controllers/auth-controller");

authRouter.post("/registers", registerValidator, authController.register);
authRouter.post("/logins", loginValidator, authController.login);

module.exports = authRouter;
