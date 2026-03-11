import { Router } from "express";
import { registerUser } from "../controller/auth.controller.js";
import { registerValidation } from "../validator/auth.validator.js";

const authRouter = Router()

authRouter.post("/register",registerValidation,registerUser)

export default authRouter