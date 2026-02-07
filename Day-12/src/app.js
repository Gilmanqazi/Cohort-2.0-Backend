//server create karna 
const express = require("express")

//Authentication
const authRoute = require("./routes/auth.route")

//Cookies
const cookieParser = require("cookie-parser")

//Express ko call karna
const app = express()

//dotenv
require("dotenv").config()

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoute)


module.exports = app