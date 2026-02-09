const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const path = require("path")



const authRouter = express.Router()

authRouter.post("/register",async (req,res)=>{

  const {name,emaill,password} = req.body

  
  const isUserAlreadyExist = await userModel.findOne({emaill})

  if(isUserAlreadyExist){
    return res.status(400).json({
      message:"User with this email already exist"
    })
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")

  const user = await userModel.create({
    name,emaill,password:hash
  }) 

  const token = jwt.sign({
    id:user._id,
    emaill:user.emaill
  },
process.env.JWT_SECRET
)

res.cookie("JWT_Cookies",token)

  res.status(201).json({
    message:"User Registration Successfull",
    user,
    token,
  })
})

authRouter.post("/protected",(req,res)=>{
console.log(req.cookies)

res.status(200).json({
  message:"cookies received successfull"
})
})

authRouter.post("/login",async(req,res)=>{
  const {emaill,password} = req.body

  const user = await userModel.findOne({emaill})

  if(!user){
    return res.status(401).json({
      message:"email address is incorrect"
    })
  } 

  const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

  if(!isPasswordMatched){
    return res.status(401).json({
      message:"Invalid Password"
    })
  } else{
    res.status(200).json({
      message:"Login successfull"
    })
   }

})

authRouter.use("*name",(req,res)=>{
  res.sendFile(path.join(__dirname, ".." , "/public/index.html"))

})
console.log(__dirname, ".." , "/public/index.html")

module.exports = authRouter

