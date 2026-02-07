const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
  const {name,email,password} = req.body

  const isUserAlreadyExist = await userModel.findOne({email})

  if(!email.includes("@")){
   return res.status(400).json({
      message:"Invalid email formatte: missing @"
    })
  }

  if(isUserAlreadyExist){
    return res.status(401).json({
      message:"User With This Email Already Exist"
    })
  }


  const hash = crypto.createHash("md5").update(password).digest("hex")

  const user = await userModel.create({
    name,email,password:hash
  })

const token = jwt.sign({
  id:user._id,
  email:user.email
},
process.env.JWT_SECRET
)

res.cookie("JWT_token",token)

  res.status(201).json({
    message:"user registered",
    user,
    token,
  })
})

authRouter.post("/protected",(req,res)=>{
  console.log(req.cookies)

  res.status(200).json({
    message:"Token Updated Successfull"
  })
})

authRouter.post("/login",async (req,res)=>{
  const {email,password} = req.body

  const user = await userModel.findOne({email})

  if(!user){
    res.status(401).json({
      message:"Plz Enter Correct Email"
    })
  } 

  const isPasswordCorrect = await user.password === crypto.createHash("md5").update(password).digest("hex")

  if(!isPasswordCorrect){
    res.status(401).json({
      message:"Inavalid Password"
    })
  }
  else{
    res.status(200).json({
      message:"Login Successfull"
    })
  }
})


module.exports = authRouter