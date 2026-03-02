const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blackList.model")


async function registerAuthController (req,res){

  const {username,email,password} = req.body

  const AlreadyExist = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  if(AlreadyExist){
    return res.status(409).json({
      message:"User Already Exist"
    })
  }

  const hash = await bcrypt.hash(password,10)

  const user = await userModel.create({
    username,
    email,
    password:hash
  })

  const token =  jwt.sign({
    id: user._id,
    username:user.username
  },
process.env.JWT_SECRET ,{expiresIn:"5d"}
)
res.cookie("token",token)

res.status(201).json({
  message:"Registration Successfull",
  user:{
    id:user._id,
    username:user.username,
    email:user.email
  }
})

}

async function loginAuthController (req,res){

  const {username,email,password} = req.body

  const user = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  }).select("+password")

  if(!user){
    return res.status(400).json({
      message:"Invalid Creadintials"
    })
  }

  const isPassword = await bcrypt.compare(password,user.password)

  if(!isPassword){
    return res.status(400).json({
      message:"Invalid Creadiantials"
    })
  }
  const token = jwt.sign({
    id:user._id
  },
process.env.JWT_SECRET,{expiresIn:"5d"}
)

res.cookie("token",token)

  res.status(200).json({
    message:"Login Success",
    user:{
      id:user._id,
      username:user.username,
      email:user.email,
     
    }
  })


}

async function getMe (req,res){

 const user = await userModel.findById(req.user.id)


 res.status(200).json({
  message:"User Fetched Successfully",
  user
 })

}

async function logOutUserController(req, res) {
  const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token, Date.now().toString(), "EX", 60 * 60)

    res.status(200).json({
        message: "logout successfully."
    })

}
/**
 * key value
 * js object
 * {
 *  username:'test',
 *  email:'test@test.com'
 * }
 */
module.exports = {
  registerAuthController,
  loginAuthController,
  getMe,
  logOutUserController
}