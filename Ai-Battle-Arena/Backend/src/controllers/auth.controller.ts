import userModel from "../model/user.model.js"
import jwt from "jsonwebtoken"
import  Request from "express"
import Response from "express"
import redis from "../config/redisClient.js"




export const registerController = async (req:Request,res:Response) => {

try {

  const {username , email, password} = req.body

  if(!username || !email || !password){
    return res.status(400).json({
      message:"All fields are required"
    })
  }

  const AlreadyExist = await userModel.findOne({
    $or:[
      {username},{email}
    ]
  })

  if(AlreadyExist){
    return res.status(400).json({
      message:"User Already Exist"
    })
  }

const user = await userModel.create({
  username:username,
  email:email,
  password:password
})

const jwtSecret = process.env.JWT_SECRET

if(!jwtSecret){
  return res.status(400).json({
    message:"JWT_SECRET is not define in ENV"
  })
}

const token = jwt.sign({
  id:user._id,
  email:user.email
},
jwtSecret,{expiresIn:"7d"}
)

res.cookie("token",token,{
  httpOnly:true,
  maxAge:7 * 24 * 60 * 60 * 1000
})

const userResponse = {id:user._id, username:user.username, email:user.email}

res.status(201).json({
  message:"User registred successfull",
  success:true,
  user:userResponse
})
  
} catch (err) {
  console.error("Registration Error:" ,err);
  return res.status(500).json({ message: "Internal Server Error" });
}

}

export const loginController = async (req:Request,res:Response) => {

  const {email,password} = req.body

  const user = await userModel.findOne({email}).select("+password")

  if(!user){
    return res.status(400).json({
      message:"Invalid Credintials"
    })
  }

  const isMatched = await user.comparePassword(password)

  if(!isMatched){
    return res.status(400).json({
      message:"Invalid Credintials"
    })
  }

  const token = jwt.sign({
    id:user._id,
    email:user.email
  },process.env.JWT_SECRET,{expiresIn:"7d"})

  res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    maxAge:7 * 24 * 60 * 60 * 1000
  })

  const userResponse = {id:user._id, username:user.username, email:user.email}

  res.status(200).json({
    message:"Login Success",
    success:true,
    userResponse
  })

}

export const getMe = async (req:Request,res:Response) => {

  try {

    const user = await userModel.findById(req.user.id)

  res.status(200).json({
    message:"User fetched successfull",
    success:true,
    user
  })
    
  } catch (error) {
    res.status(500).json({
      message:err.message
    })
  }

}

export const logOut = async (req:Request,res:Response) => {

  try {

 const token = req.cookies.token

 if (!token) {
  return res.status(401).json({ message: "Already logged out or no token" });
}


 await redis.set(token, Date.now().toString(), "EX", 60 * 60)

 res.clearCookie("token")


if(!token){
  return res.status(404).json({message:"Token not provided"})
}

res.status(200).json({
  message: "logout successfully."
})
    
  } catch (error) {
    console.error(error)
  }

}