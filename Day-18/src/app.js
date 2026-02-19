const express = require("express")
const authRouter = require("../src/Router/auth.route")
const postRouter = require("../src/Router/post.route")
const followRouter  = require("../src/Router/follow.route")
const likeRouter = require("../src/Router/like.route")
const cookieParser = require("cookie-parser")


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/follow",followRouter)
app.use("/api/like",likeRouter)

module.exports = app