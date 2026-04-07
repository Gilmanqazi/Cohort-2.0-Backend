import express  from "express";
import  { getMe, loginController,  registerController,logOut } from "../controllers/auth.controller.js";
import authUser from "../middleware/auth.middleware.js";

const authRouter = express.Router()

authRouter.post("/register",registerController)

authRouter.post("/login",loginController)

authRouter.get("/get-Me",authUser,getMe)

authRouter.post("/logOut",authUser,logOut)


export default authRouter