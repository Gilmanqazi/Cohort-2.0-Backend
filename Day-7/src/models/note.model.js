const mongoose = require("mongoose")

const modelSchema = new mongoose.Schema({
  title:String,
  desc:String,
  age:Number,
})

const noteModel = mongoose.model("notes",modelSchema)

module.exports = noteModel