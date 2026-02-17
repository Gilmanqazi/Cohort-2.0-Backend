const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("./Router/auth.route")
const postRouter = require("./Router/post.route")
const followRouter = require("./Router/follow.route")
const likeRouter = require("./Router/like.route")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/user",followRouter)
app.use("/api/",likeRouter)
module.exports = app 