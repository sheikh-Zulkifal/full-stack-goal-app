const express = require ("express");

const colors = require ('colors')
const cors = require('cors')
const dotenv = require("dotenv").config()
const {errorHandler} = require('./middlewares/errMiddleware.js')
const connectDB = require('./config/db.js')
const port  = process.env.PORT || 5000

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true,
}))


app.use("/api/goals" ,require('./routes/goalRoutes.js'))
app.use("/api/users" ,require('./routes/userRoutes.js'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))