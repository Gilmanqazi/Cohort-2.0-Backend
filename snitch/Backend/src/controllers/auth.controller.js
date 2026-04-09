import bcrypt from "bcryptjs";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"


 const sendTokenResponse = (user,res,message) =>{

  const token = jwt.sign({
    id:user._id,
  },config.JWT_SECRET,{expiresIn:"7d"})

  res.cookie("token",token)

  res.status(200).json({
    message,
    success:true,
    user:{
      id:user._id,
      fullname:user.fullname,
      contact:user.contact,
      email:user.email,
      role:user.role
    }
  })

}

export const registerController = async (req,res) => {

 try {
  const {fullname,contact,email,password,isSeller} = req.body

  const alredyExist = await userModel.findOne({
    $or:[
      {email},{contact}
    ]
  })

  if(alredyExist){
    return res.status(401).json({
      message:"User already exist"
    })
  }

  const user = await userModel.create({
    fullname,
    contact,
    email,
    password,
    role:isSeller ? "seller":  "buyer"
  })


await sendTokenResponse(user,res,"User registred successfully")
 } catch (error) {
  res.status(500).json({message:"Server error",error})
 }

}

export const loginController = async (req,res) =>{
try {
  
  const {email,password} = req.body

  const user = await userModel.findOne({email}).select("+password")
 

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });


  await sendTokenResponse(user,res,"Login Successfull")
} catch (error) {
  res.status(500).json({
    message:error.message
  })
  console.log(error)
}
}