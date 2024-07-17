require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRouter = require("./src/routes/auth-route");
const userRouter = require("./src/routes/user-route");
const stockRouter = require("./src/routes/stock-route");
const { notFoundMiddleware } = require("./src/middlewares/not-found");
const errorMiddleware = require("./src/middlewares/error");
const productRouter = require("./src/routes/product-route");
const morgan = require("morgan");
const { authenticate } = require("./src/middlewares/authenticate");
const { isAdmin } = require("./src/middlewares/isAdmin");
const passport = require("passport");
const { expressSession } = require("./src/config/expressSession");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(expressSession());
app.use(passport.initialize());
app.use(passport.session());

app.use("/public/images", express.static("public/images"));

app.use(express.json());

app.use(authRouter);
app.use("/admin", authenticate, isAdmin, stockRouter);
app.use("/users", authenticate, userRouter);
app.use("/product", productRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT_BACK_END || 8000;
app.listen(port, () => console.log("Running server", port));
