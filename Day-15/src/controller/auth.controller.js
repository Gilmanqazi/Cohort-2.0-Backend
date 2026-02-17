const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerAuthController(req,res){

  const {username,email,password,bio,profileImage} = req.body

  const isUserAlreadyExist = await userModel.findOne({
    $or:[
      {username},
      {email},
    ]
  })
 
  if(isUserAlreadyExist){
    return res.status(401).json({
      message:"User Already Exist"  +  (  isUserAlreadyExist.email === email ?  "With this email":"With this username")
    })
  }

  const hash = await bcrypt.hash(password,10)

  const user = await userModel.create({
    username,
    email,
    password:hash,
    bio,
    profileImage
  })

  const token = jwt.sign({
    id:user._id
  },
process.env.JWT_SECRET)

res.cookie("token",token)

res.status(201).json({
  message:"Registration Successfull",
  user:{
    username:user.username,
    email:user.email,
    bio:user.bio,
    profileImage:user.profileImage
  }
})

}

async function loginAuthController(req,res){

  const {username,email,password} = req.body

  const user = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  const token = jwt.sign({
    id:user._id
  },
process.env.JWT_SECRET)

res.cookie("token",token)

  if(!user){
    return res.status(401).json({
      message:"User Not Found"
    })
  }

  const IsPasswordValid = await bcrypt.compare(password,user.password)

  if(!IsPasswordValid){
    return res.status(401).json({
      message:"Invalid Password"
    })
  }


  res.status(200).json({
  message:"Login Successfull",
    
  })

}


module.exports = {
  registerAuthController,
  loginAuthController,
}