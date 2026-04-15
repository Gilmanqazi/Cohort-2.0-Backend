import productModel from "../models/product.model.js";
import {uploadFile} from "../services/storage.services.js"



export const createProducts = async (req,res) =>{
 
  const {title,description,priceAmount,priceCurrency} = req.body

const seller = req.user
try {
  
const images = await Promise.all(req.files.map(async(file)=>{
return await uploadFile({
  buffer:file.buffer,
  fileName:file.originalname
})
}))

const products = await productModel.create({
title,
description,
price:{
  amount:priceAmount,
  currency:priceCurrency || "INR"
},
images,
seller:seller._id
})

res.status(201).json({message:"Product Created Successfull",success:true,products})
} catch (error) {
  console.log(error)
}

}

export const getSellerProducts = async (req,res) =>{

  const seller = req.user


  const products = await productModel.find({seller:seller._id})
  
  res.status(200).json({
    message:"Product Fetched Successfully",
    success:true,
    products
  })

}