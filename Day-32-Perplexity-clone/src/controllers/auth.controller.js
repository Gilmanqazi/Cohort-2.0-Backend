import userModel from "../models/user.model.js";
import { sendMail } from "../services/mail.server.js";
import jwt from "jsonwebtoken"


export async function registerContrller (req,res,next){

const {username, email, password} = req.body

const isUserAlreadyExists = await userModel.findOne({
  $or:[
    {email},{username}
  ]
})


if(isUserAlreadyExists){
  return res.status(400).json({
    message:"User with this email already exist",
    success:false,
    err:"User already exist"
  })
}

const user = await userModel.create({
  username,email,password
})

const emailVarificationToken = jwt.sign({
  email:user.email
},
process.env.JWT_SECRET)


await sendMail({
to: email,
subject:"Welcome to Perplexity!",
html:`<p>Hi ${username}</p>
<p>Thank for registering at <strong>perplexity</strong> </p>
<a href="http://localhost:3000/api/auth/verify-email?token=${emailVarificationToken}"
<p>If you did not create an accound </p>
`

})

res.status(201).json({
  message:"User register Successfull",
  user
})

}

export async function verifyEmail(req,res){
const {token} = req.query

try{
const decoded = jwt.verify(token, process.env.JWT_SECRET)

const user = await userModel.findOne({email:decoded.email})

if(!user){
  return res.status(400).json({
    message:"Invalid token",
    success:false,
    err:"User not found"
  })
}

user.verified = true;
await user.save()

const html = 
`
  <h1>Email Verified Successfully</h1>
  <p>Your email has been verified you can no log in to your account </p>
<a href="http://localhost:3000/login">Go to Login</a>
  `

  return res.send(html)

}catch(err){
  return res.status(400).json({
    message:"Token Inavlid or expired ",
    success:false,
    err:err.message

  })
}
}


export async function loginController (req,res){
const {email,password} = req.body;

const user = await userModel.findOne({
  $or:[
    {email},{password}
  ]
})

console.log(user , "User hai ")

if(!user.verified){
  return res.status(400).json({
    message:"Please verify your email before logging in ",
    success:false,
    err:"User not found"
  })
}

const token  = jwt.sign({
  id:user._id,
  username:user.username,
},process.env.JWT_SECRET)


res.cookie("token",token)

res.status(200).json({
  message:"User logged in successfull",
  success:true,
  user:{
    id:user._id,
    username:user.username,
    email:user.email
  }
})

}

export async function getMe (req,res){
  
const userId = req.user.id

console.log(userId)

const user = await userModel.findById(userId).select("-password");

if(!user){
  return res.status(404).json({
    message:"User not found",
    seccess:false,
    err:"User not found"
  })
}

res.status(200).json({
  message:"User fetched successfully",
  seccess:true,
  user
})

}
