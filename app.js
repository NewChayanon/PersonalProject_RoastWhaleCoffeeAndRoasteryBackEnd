require('dotenv').config()
const cors = require('cors');
const express = require('express');
const authRouter = require('./src/routes/auth-route');
const app = express()

app.use(cors())

app.use(express.json());

app.use(authRouter)


const port = process.env.PORT || 8000
 app.listen(port,()=>console.log("Running server",port))