const express = require("express")
const authController = require("../controllers/auth.Controller")
const authUser = require("../middlewares/auth.middleware")

const authRouter = express.Router()

authRouter.post("/register",authController.registerAuthController)
authRouter.post("/login",authController.loginAuthController)
authRouter.get("/getme",authUser,authController.getMe)
authRouter.get("/logout",authController.logOutUserController)

module.exports = authRouter