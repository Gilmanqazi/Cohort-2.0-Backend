import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema({
  chat:{
type:mongoose.Schema.Types.ObjectId,
ref:"Chat",
required:true
  },
  content:{
    type:String,
  required:true,
  role:[user,ai],
  required:true
  },
  
},{timeseries:true});
const messageModel = mongoose.model("Message".messageSchema);

export default messageModel