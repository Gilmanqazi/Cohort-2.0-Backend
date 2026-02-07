const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")


const authRoute = express.Router()

authRoute.post("/register",async(req,res)=>{

  const {name,email,password} = req.body

  const isUserEmailAddressAlreadyExist = await userModel.findOne({email})

  if(isUserEmailAddressAlreadyExist){
    return res.status(400).json({
      message:"Email Address Already Exist"
    })
  }

  const user = await userModel.create({
    name,email,password
  })

  const token = jwt.sign({
    id:user._id,
    email:user.email,
  },
  process.env.JWT_SECRET
)

res.cookie("jwt_token",token)

  res.status(201).json({
    message:"user registration successfull",
    user,
    token,
  })
})

module.exports = authRoute