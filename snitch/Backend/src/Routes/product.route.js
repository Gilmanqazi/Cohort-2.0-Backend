import express from "express"
import multer from "multer"
import {  authenticationSeller } from "../middleware/auth.middleware.js"
import { addVarientToProduct, createProducts, getAllProducts,  getProductById, getSellerProducts } from "../controllers/product.controller.js"
import { createProductValidator } from "../validator/product.validator.js"


const upload = multer({
  storage:multer.memoryStorage(),
  limits:{
    fileSize: 5 * 1024 * 1024
  }
})

const Routes = express.Router()

Routes.post("/",authenticationSeller,upload.array("images",7),createProductValidator,createProducts
) 

Routes.post("/:productId/add-Varints",authenticationSeller,addVarientToProduct)

Routes.get("/seller",authenticationSeller,getSellerProducts)

Routes.get("/",getAllProducts)
Routes.get("/:id",getProductById)

export default Routes