const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("../src/Routes/auth.route")
const cors = require("cors")
const songRouter = require("../src/Routes/song.route")

const app = express()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(cookieParser())


app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/song",songRouter)
module.exports = app