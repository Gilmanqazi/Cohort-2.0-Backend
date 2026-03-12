import { Router } from "express";
import { registerContrller } from "../controllers/auth.controller.js";
import { validateRegister } from "../validation/auth.validator.js";

const authRouter = Router()


authRouter.post("/register",validateRegister,registerContrller)

export default authRouter