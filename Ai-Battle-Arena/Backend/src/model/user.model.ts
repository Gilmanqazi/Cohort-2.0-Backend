import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {Schema,Document} from "mongoose"

export interface IUser extends Document{
username:String;
email:String;
password:String;
comparePassword(candidatePassword:String): Promise<boolean>
}

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:true,
    required:[true,"Username is required"],
    trim:true,
  },
  email:{
    type:String,
    unique:true,
    required:[true,"Email is required"],
    trim:true
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    trim:true,
    select:false
  }
},{timestamps:true})

userSchema.pre<IUser>("save",async function (){

 if(!this.isModified("password")) return 

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
 


})

userSchema.methods.comparePassword = function (candidatePassword:String): Promise<boolean>{
  return bcrypt.compare(candidatePassword,this.password)
}
 
const userModel = mongoose.models.User || mongoose.model<IUser>("users",userSchema)
export default userModel

