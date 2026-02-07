const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({  //Schema user ka typebatayenga 
  name:String,
  email:{
type:String,
unique:[true,"Email address already exist plz try another email"]
  },
  password:String,
})

const userModel = mongoose.model("users",userSchema) //koi bhi model perform karne ke liye

module.exports = userModel