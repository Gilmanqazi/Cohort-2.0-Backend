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
seller:seller._id,
})

res.status(201).json({message:"Product Created Successfull",success:true,products})
} catch (error) {
  console.log(error)
}

}

export const addVarientToProduct = async (req,res)=>{
try {
  const productId = req.params.productId

  const product = await productModel.findOne({
    _id:productId,
    seller:req.user._id
  })
  
  if(!product){
    return res.status(404).json({ message: "Product not found" });
  }

  const files = req.files
  const images = []

if(files || files.length !== 0){
  (await Promise.all(files.map(async (file)=>{
    const image = await uploadFile({
      buffer:file.buffer,
      fileName:file.originalname
    })
    return image
  }))).map(image=> images.push(image))
}
 const price = req.body.priceAmount
 const stock = req.body.stock 
 const attributes = JSON.stringify(req.body.attributes || "{}")

 product.varients.push({
  images,
  price:{
    amount:Number(price) || product.price.amount
  },
  stock,
  attributes
 })

 await product.save()

  res.status(200).json({ message: "Variant added successfully",success: true,
    product  });
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

export const deleteProduct = async (req,res)=>{
const productId = req.params.id
const seller = req.user._id

  console.log(productId,"IDD")
  console.log(seller,"IDD")
  const products = await productModel.findOne({
    _id:productId,
    seller:seller
  })
  if(!products){
    return res.status(403).json({
      message:"Forbidden",
      success:false
    })
  }

  products.images.map((e)=>{
    console.log(e,"EEEE")
  })

  // const file = req.files

  // console.log(file)
}