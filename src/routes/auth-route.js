const express = require("express");
const authRouter = express.Router();
const { registerValidator, loginValidator } = require("../middlewares/validator");
const authController = require("../controllers/auth-controller");
const passport = require("../config/passport");

authRouter.post("/register", registerValidator, authController.register);
authRouter.post("/login", loginValidator, authController.login);
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), authController.googleLogin);


module.exports = authRouter;
