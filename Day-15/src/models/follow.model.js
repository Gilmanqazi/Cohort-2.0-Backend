const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({

  follower:{
    type:String,
    createdAt:Date
  },
  following:{
    type:String,
    createdAt:Date
  }
},{timestamps:true})

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const followModel = mongoose.model("follow",followSchema)

module.exports = followModel