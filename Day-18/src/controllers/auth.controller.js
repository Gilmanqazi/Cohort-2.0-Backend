const userModel = require("../models/auth.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



async function registerAuthController(req,res){

const {username,email,password,bio,profileImage} = req.body

const UserAlreadyExist = await userModel.findOne({
  $or:[
    {username},
    {email}
  ]
})

if(UserAlreadyExist){
  return res.status(401).json({
    message:"User Already Exist"
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
process.env.JWT_SECRET,{expiresIn:"5d"}
)

res.cookie("token",token)

res.status(201).json({
  messager:"Registration Successfull",
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

if(!user){
  return res.status(401).json({
    message:"User Not Found" 
  })
}

const isValidPassword = await bcrypt.compare(password,user.password)

if(!isValidPassword){
  return res.status(401).json({
    message:"Invalid Password"
  })
}

const token = jwt.sign({
  id:user._id
},
process.env.JWT_SECRET, {expiresIn:"5d"}
)

res.cookie("token",token)



res.status(200).json({
  message:"Login successfull"
})

}

module.exports = {
  registerAuthController,
  loginAuthController
}