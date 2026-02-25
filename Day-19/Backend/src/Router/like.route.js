const express = require("express")
const likeController = require("../controllers/likes.controller")
const identifyUser = require("../middlewares/auth.middleware")

const likeRouter = express.Router()

likeRouter.post("/:id",identifyUser,likeController.likeUserController)

module.exports = likeRouter