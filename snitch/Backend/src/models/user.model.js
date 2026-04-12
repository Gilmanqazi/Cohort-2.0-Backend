import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
 fullname:{
  type:String,
  required:[true,"Username is required"],
  unique:false
 },
 contact:{
  type:String,
  required:[true,"Mobile number is required"]
 },
 email:{
  type:String,
  required:[true,"Email is required"],
  unique:true
 },
 password:{
  type:String,
required:[true,"Password is required"],
select:false
},
role:{
  type:String,
    enum:["seller","buyer"],
    default:"buyer"
}
},{timestamps:true})

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}


const userModel = mongoose.model("users",userSchema)

export default userModel
