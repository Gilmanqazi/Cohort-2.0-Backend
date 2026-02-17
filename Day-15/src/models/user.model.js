const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:[true,"Username is already exist"],
    required:[true,"Username is required"],
  },
  email:{
    type:String,
    unique:[true,"Email is already exist"],
    required:[true,"Emial is required"]
  },
  password:{
    type:String,
    required:[true,"Password is required"]
  },
  bio:{
    type:String
  },
  profileImage:{
    type:String,
    default:"https://imgs.search.brave.com/J5-KJNoclGIgO9mgbMuULm8xw_ri-hvqZYOyhc50Q64/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE3LzM0LzY3/LzM2MF9GXzIxNzM0/Njc4Ml83WHBDVHQ4/YkxOSnF2VkFhRFpK/d3Zaam0wZXBRbWo2/ai5qcGc"
  },
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel