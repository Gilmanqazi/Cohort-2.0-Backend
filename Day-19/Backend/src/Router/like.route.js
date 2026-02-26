const express = require("express")
const likeController = require("../controllers/likes.controller")
const identifyUser = require("../middlewares/auth.middleware")

const likeRouter = express.Router()

likeRouter.post("/like/:id",identifyUser,likeController.likeUserController)
likeRouter.post("/unlike/:id",identifyUser,likeController.unLikeUserController)



module.exports = likeRouter