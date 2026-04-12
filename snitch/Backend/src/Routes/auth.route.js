import express from "express"
import {loginValidator, registerValidator} from "../validator/auth.validator.js"
import { getMe, googleCallback, loginController, registerController } from "../controllers/auth.controller.js"
import passport from "passport"
import { authUser } from "../middleware/auth.middleware.js"

const authRouter = express()

authRouter.post("/register",registerValidator,registerController)
authRouter.post("/login",loginValidator,loginController)
authRouter.get("/google",passport.authenticate("google", {scope:["profile","email"]}),)
authRouter.get("/google/callback", passport.authenticate("google",{session:false}),googleCallback)
authRouter.get("/getMe",authUser,getMe)

export default authRouter