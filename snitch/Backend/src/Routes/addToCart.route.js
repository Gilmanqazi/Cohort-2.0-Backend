import express from "express"
import { authenticateUser } from "../middleware/auth.middleware.js"
import { addToCartController, getAddToCartProdcuts } from "../controllers/addToCart.controller.js"

const cartRoute = express()

cartRoute.post("/cart",authenticateUser,addToCartController)
cartRoute.get("/cart/getUserCart",authenticateUser,getAddToCartProdcuts)

export default cartRoute