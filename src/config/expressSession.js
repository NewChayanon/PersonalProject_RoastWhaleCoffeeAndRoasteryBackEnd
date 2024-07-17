const session = require("express-session");
exports.expressSession = () =>
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  });