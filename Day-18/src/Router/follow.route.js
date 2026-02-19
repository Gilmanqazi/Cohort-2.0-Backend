const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const followController = require("../controllers/follow.controller")


const followRouter = express.Router()

followRouter.post("/:username",identifyUser,followController.followUserControllar)

followRouter.get("/:username",identifyUser,followController.acceptRequestController)

module.exports = followRouter