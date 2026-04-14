import express from "express"
import {loginValidator, registerValidator} from "../validator/auth.validator.js"
import { getMe, googleCallback, loginController, registerController } from "../controllers/auth.controller.js"
import passport from "passport"
import { authenticationSeller } from "../middleware/auth.middleware.js"
import { config } from "../config/config.js"


const authRouter = express()

authRouter.post("/register",registerValidator,registerController)
authRouter.post("/login",loginValidator,loginController)
authRouter.get("/google",passport.authenticate("google", {scope:["profile","email"]}),)
authRouter.get("/google/callback", passport.authenticate("google",{session:false,failureRedirect:config.NODE_ENV == "develpoment" ? "http://localhost:5173/login" : "/login"}),googleCallback)
authRouter.get("/getMe",authenticationSeller,getMe)

export default authRouter