// server create karna


const express = require("express")
require("dotenv").config()
const authRouter = require("./Router/user.route")
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express()
app.use(cookieParser())

app.use(cors())

app.use(express.json())

app.use("/api/auth",authRouter)

module.exports = app