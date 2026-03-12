import userModel from "../models/user.model.js";
import { sendMail } from "../services/mail.server.js";


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

await sendMail({
to: email,
subject:"Welcome to Perplexity!",
html:`Hi ${username}, djfjjssjffnjdkjskjdsnjfdnjfdnjsjsjsjsjsssssssssssss`

})

res.status(201).json({
  message:"User register Successfull",
  user
})

}
