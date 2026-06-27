import { IUser} from "@/types/user.types";
import mongoose from "mongoose";
import bcrypt from "bcrypt"


interface UserDocument extends Omit<IUser, "_id"> , Document {
  comparePass(candidatePassword:string):boolean
}

const userSchema = new mongoose.Schema <UserDocument>({
  name:{
    type:String,
    trim:true,
    require:[true,"Name is required"]
  },

  email:{
    type:String,
    trim:true,
    require:[true,"Email is required"],
    unique:true
  },

  password:{
    type:String,
    require:[true,"Name is required"],
    minLength:[6, "Min 6 characters required"]
  },

  mobile:{
    type: String,
    minLength: [10, "Min 10 char required"],
    maxLength: [10, "Max 10 char required"],
  },
 

},
{timestamps:true}
)

userSchema.pre("save",function():void{

  if(!this.isModified("password")) return

 this.password = bcrypt.hashSync(this.password, 10);
})

userSchema.methods.comparePass = function (candidatePassword:string):boolean{
  return bcrypt.compareSync(candidatePassword, this.password)
}

const userModel = mongoose.model("User",userSchema)

export default userModel;

