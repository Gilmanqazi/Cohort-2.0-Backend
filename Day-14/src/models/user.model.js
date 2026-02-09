const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name:String,
  emaill:{
  type:String,
  unique:[true,"User with this email already exist"]
},
  password:String,
})

const userModel = mongoose.model("userss",userSchema)

module.exports = userModel