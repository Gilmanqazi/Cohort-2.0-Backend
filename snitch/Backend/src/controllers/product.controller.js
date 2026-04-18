import productModel from "../models/product.model.js";
import {uploadFile} from "../services/storage.services.js"



export const createProducts = async (req,res) =>{
 
  const {title,description,priceAmount,priceCurrency,varients} = req.body

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
seller:seller._id,
varients:varients || []
})

res.status(201).json({message:"Product Created Successfull",success:true,products})
} catch (error) {
  console.log(error)
}

}

export const addVarientToProduct = async (req,res)=>{
try {
  const {productId} = req.params
  const {images,stock,attribute,price} = req.body

  const products = await productModel.findById(productId)
  if(!products){
    return res.status(404).json({ message: "Product not found" });
  }

  const newVarients = {
images,stock,attribute,price
  }
  products.varients.push(newVarients)

  await products.save()

  res.status(200).json({ message: "Variant added successfully", products });
} catch (error) {
  res.status(500).json({ message: error.message });
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

export const getAllProducts = async (req,res) =>{

  const products = await productModel.find()

  res.status(200).json({
    message:"Products fetches successfull",
    success:true,
    products
  })

}


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; 
    const products = await productModel.findById(id); 
    if (!products) {
      return res.status(404).json({ message: "Product nahi mila!" });
    }

    res.status(200).json({
      message:"Products By Id successfull",
      success:true,
      products
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};