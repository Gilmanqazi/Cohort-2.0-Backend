const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:[true,"Username must be unique"],
    require:[true,"Username is required"],
  },
  email:{
    type:String,
    unique:[true,"Email must be unique"],
    reqired:[true,"Email is requried"]
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    select:false
  }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel