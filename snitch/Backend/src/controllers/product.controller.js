import productModel from "../models/product.model.js";
import {uploadFile} from "../services/storage.services.js"
import {config} from "../config/config.js"
import { deleteFileFromImageKit } from "../services/storage.services.js";


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

export const deleteProduct = async (req, res) => {
  try {
      const productId = req.params.id;
      const sellerId = req.user._id;

      // 1. Database se product dhoondo (Verification)
      const product = await productModel.findOne({ _id: productId, seller: sellerId });

      if (!product) {
          return res.status(404).json({ success: false, message: "Product not found" });
      }

      // 2. Saare URLs collect karo
      const allUrls = [];
      if (product.images) product.images.forEach(img => allUrls.push(img.url));
      if (product.varients) {
          product.varients.forEach(v => v.images?.forEach(img => allUrls.push(img.url)));
      }

      // 3. ImageKit Deletion (WITH AWAIT)
      const endpoint = config.urlEndpoint; 

      // Saare paths ka array banao
      const pathsToDelete = allUrls.map(url => url.replace(endpoint, ""));

      

      // 🔥 Promise.all ke peeche 'await' lagana compulsory hai
      const deletionResults = await Promise.all(
          pathsToDelete.map(path => deleteFileFromImageKit(path))
      );

      // 4. Database se delete karo (Sirf tab jab images ka process complete ho jaye)
      await productModel.findByIdAndDelete(productId);

      res.status(200).json({
          success: true,
          message: "Product and images deleted successfully",
          details: deletionResults
      });

  } catch (error) {
      console.error("Delete Controller Error:", error);
      res.status(500).json({ success: false, message: error.message });
  }
};

export const searchProduct = async (req,res) =>{
try {
  const {q} = req.query
if(!q){
  return res.status(401).json({message:"Search Query is required"})
}

const products = await productModel.find({
  $or:[
    {title:{$regex:q, $options:"i"}}
  ]
}).limit(10)

res.status(200).json({
  success:true,
  products
})

} catch (error) {
  res.status(500).json({ message: error.message });
}
}