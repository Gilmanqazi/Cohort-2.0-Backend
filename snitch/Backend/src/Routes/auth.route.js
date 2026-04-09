import express from "express"
import {loginValidator, registerValidator} from "../validator/auth.validator.js"
import { loginController, registerController } from "../controllers/auth.controller.js"

const authRouter = express()

authRouter.post("/register",registerValidator,registerController)
authRouter.post("/login",loginValidator,loginController)

export default authRouter