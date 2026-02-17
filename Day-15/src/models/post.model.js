const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  caption:{
    type:String,
    required:[true,"Caption is Required"]
  },
  imgUrl:{
    type:String,
    required:[true,"creating a post  img is required"]
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true,"Forn createitn a post UserId is Required"]
  },
})

const postModel = mongoose.model("posts",postSchema)


module.exports = postModel