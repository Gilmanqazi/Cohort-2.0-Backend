const express = require("express")
const likesController = require("../controller/like.controller")
const identifyUser = require("../middlewares/auth.middleware")

const likeRouter = express.Router()


likeRouter.post("/likes/:id",identifyUser,likesController.likesController)


module.exports = likeRouter