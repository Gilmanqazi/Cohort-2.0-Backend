const express = require("express")
const authRouter = require("./Routes/user.route")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")



const app = express()

app.use(express.static("./public"))

require("dotenv").config()

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRouter)

module.exports = app