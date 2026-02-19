const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username:{
    type:String,
    unique:[true,"Username is already exist"],
    required:[true,"Username is required"],
  },
  email:{
    type:String,
    unique:[true,"Email is already exist"],
    required:[true,"Email is required"]
  },
  password:{
    type:String,
    required:[true,"Password is required"],
  },
  bio:{
    type:String
  },
  profileImage:{
    type:String,
    default:"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
  }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel