const express = require("express")
const authController = require("../controllers/auth.controller")
const identifyUser = require("../middlewares/auth.middleware")

const authRouter = express.Router()

authRouter.post("/register",authController.registerAuthController)
authRouter.post("/login",authController.loginAuthController)
authRouter.get("/get-me",identifyUser,authController.getMeController)

module.exports = authRouter