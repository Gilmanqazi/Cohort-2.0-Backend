const express = require("express")
const userModel = require("../models/user.model")
const jtw = require("jsonwebtoken")
const crypto = require("crypto")


const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
  const {name,emails,password} = req.body

  const isEmailAlredyExist = await userModel.findOne({emails})

  if(isEmailAlredyExist){
   return res.status(401).json({
      message:"User with this email already exist"
    })
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")

  const user = await userModel.create({
    name,emails,password:hash
  })

  const token = jtw.sign({
    id:user._id,
    email:user.emails
  },
process.env.JWT_SECRET,{expiresIn:"2h"}
)

res.cookie("JWT_Token",token)

  res.status(201).json({
    message:"Registration successfull",
    user,
    token,
  }) 
})

// authRouter.post("/protected",async(req,res)=>{
// console.log(await req.cookies)
// res.status(200).json({
//   message:"Cookie received successfull"
// })
// })

authRouter.get("/getme",async(req,res)=>{
  const token = req.cookies.JWT_Token

  const decoded = jwt.verify(token,process.env.JWT_SECRET)

const user = await userModel.findById(decoded._id)

res.json({
  name:user.name,
  emails:user.emails
})


})

authRouter.post("/login",async (req,res)=>{
  const {emails,password} = req.body

  const user = await userModel.findOne({emails})

  if(!user){
    return res.status(401).json({
      message:"User with this email not exist"
    })
  }

  const isPasswordCorrect = user.password === crypto.createHash("md5").update(password).digest("hex")

  if(!isPasswordCorrect){
    return res.status(401).json({
message:"Invalid Password"
    })
  } else{
    return res.status(200).json({
   message:"Login successfull"
    })
  }
})

module.exports = authRouter