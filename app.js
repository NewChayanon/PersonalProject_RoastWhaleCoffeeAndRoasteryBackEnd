require('dotenv').config()
const cors = require('cors');
const express = require('express');
const authRouter = require('./src/routes/auth-route');
const userRouter = require('./src/routes/user-route');
const stockRouter = require('./src/routes/stock-route');
const { notFoundMiddleware } = require('./src/middlewares/not-found');
const app = express()

app.use(cors())

app.use(express.json());

app.use(authRouter,userRouter)
app.use("/admin",stockRouter)

app.use(notFoundMiddleware)



const port = process.env.PORT || 8000
 app.listen(port,()=>console.log("Running server",port))