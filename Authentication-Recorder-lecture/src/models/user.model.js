const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name:String,
  emails:{
type:String,
unique:[true,"User with this email already exist"]
  },
  password:String,
})

const userModel = mongoose.model("Users",userSchema)

module.exports = userModel