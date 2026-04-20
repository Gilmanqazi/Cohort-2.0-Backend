import express from "express"
import multer from "multer"
import {  authenticationSeller } from "../middleware/auth.middleware.js"
import { addVarientToProduct, createProducts, deleteProduct, getAllProducts,  getProductById, getSellerProducts, searchProduct } from "../controllers/product.controller.js"
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

Routes.post("/:productId/add-Varints",authenticationSeller,upload.array("images",7),addVarientToProduct)

Routes.get("/seller",authenticationSeller,getSellerProducts)

Routes.delete("/delete/:id",authenticationSeller,deleteProduct)

Routes.get("/",getAllProducts)
Routes.get("/search",searchProduct)


Routes.get("/:id",getProductById)


export default Routes