const express = require("express")
const followController = require("../controller/follow.controller")
const identifyUser = require("../middlewares/auth.middleware")

const followRouter = express.Router()

followRouter.post("/follower/:username",identifyUser,followController.followUser)
followRouter.delete("/unfollow/:username",identifyUser,followController.deleteFollower)



module.exports = followRouter