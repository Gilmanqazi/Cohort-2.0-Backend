//server ko start karna

const express = require("express")
require("dotenv").config()
const authRouter = require("./Router/auth.route")
const cookieParser = require("cookie-parser")

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRouter)

module.exports = app