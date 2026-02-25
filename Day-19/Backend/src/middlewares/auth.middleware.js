const jwt = require("jsonwebtoken")
const userModel = require("../models/auth.model")


async function identifyUser (req,res,next){

  const token = req.cookies.token

  if(!token){
    return res.status(409).json({
      message:"Token not found"
    })
  }

  let decoded = null

  try{
decoded = jwt.verify(token,process.env.JWT_SECRET)
  }catch(err){

    if(!token){
      return res.status(409).json({
        message:"Token not found"
      })
    }
  }

  const user = await userModel.findById(decoded.id)


if(!user){
    return res.status(401).json({
        message:"User not found"
    })
}
     
    req.user = user
   

    next()


}

module.exports = identifyUser