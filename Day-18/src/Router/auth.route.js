const express = require("express")
const authController = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post("/register",authController.registerAuthController)
authRouter.post("/login",authController.loginAuthController)

module.exports = authRouter