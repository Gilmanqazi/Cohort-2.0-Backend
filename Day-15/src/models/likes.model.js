const mongoose = require("mongoose")


const likeSchema = new mongoose.Schema({
  likes:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"posts",
    required:[true]
  },
  user:{
    type:String,
    required:[true]
  },
},{timestamps:true})

likeSchema.index({likes:1,user:1},{unique:true})

const likeModel = mongoose.model("likes",likeSchema)

module.exports = likeModel