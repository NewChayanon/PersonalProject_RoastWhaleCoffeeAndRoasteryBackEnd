require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRouter = require("./src/routes/auth-route");
const userRouter = require("./src/routes/user-route");
const stockRouter = require("./src/routes/stock-route");
const { notFoundMiddleware } = require("./src/middlewares/not-found");
const errorMiddleware = require("./src/middlewares/error");
const productRouter = require("./src/routes/product-route");
const app = express();

app.use(cors());

app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use("/admin", stockRouter);
app.use("/users", userRouter);
app.use('/product',productRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("Running server", port));
