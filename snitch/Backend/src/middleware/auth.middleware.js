import jwt from "jsonwebtoken"
import { config } from "../config/config.js"



export const authUser = async (req,res,next) => {

try {
  const token = req.cookies?.token

  if(!token){
   return res.status(400).json({
     message:"Token not Provided"
   })
  }
 
  const decoded = await jwt.verify(token,config.JWT_SECRET)
 
  req.user = decoded
 
  next()
} catch (error) {
  console.log(error)
  res.status(500).json({
    message:"Token not authorized"
  })
}

}