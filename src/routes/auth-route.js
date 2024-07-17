const express = require("express");
const authRouter = express.Router();
const { registerValidator, loginValidator } = require("../middlewares/validator");
const authController = require("../controllers/auth-controller");
const passport = require("../config/passport")

authRouter.post("/registers", registerValidator, authController.register);
authRouter.post("/logins", loginValidator, authController.login);
authRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), authController.googleLogin);

module.exports = authRouter;
