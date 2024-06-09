require('dotenv').config()
const cors = require('cors');
const express = require('express');
const authRouter = require('./src/routes/auth-route');
const userRouter = require('./src/routes/user-route');
const stockRouter = require('./src/routes/stock-route');
const app = express()

app.use(cors())

app.use(express.json());

app.use("/",authRouter,userRouter)
app.use("/admin",stockRouter)





const port = process.env.PORT || 8000
 app.listen(port,()=>console.log("Running server",port))