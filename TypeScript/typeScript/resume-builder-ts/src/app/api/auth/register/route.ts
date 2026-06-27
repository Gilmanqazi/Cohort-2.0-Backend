import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import userModel from "@/models/user.model";
import { ApiResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

  try {             

    await connectDB();

    const body:RegisterBody = await req.json()

    const {name, email, mobile, password} = body

    if(!name || !email || !password){
return NextResponse.json<ApiResponse>({
  success:false,
  message:"All Fields Are Required",
},{
  status:400
})
}

const isExisted = await userModel.findOne({email})

if(isExisted) return NextResponse.json<ApiResponse>({
success:false,
message:"User Already Exist"
},{
  status:409
})

const newUser = await userModel.create({
  name,email,password,mobile
})


const token = generateToken({userId: newUser._id.toString()})

const response = NextResponse.json<ApiResponse>({
success:true,
message:"User registred successfully",
data:{
  user:{
    _id:newUser._id,
    name:newUser.name,
    email:newUser.email
  }
}
},{status:201})


response.cookies.set("token",token,{
  httpOnly:true,
  sameSite:"lax",
  maxAge:60*60*1000
})


return response

    
  } catch (error) {
    console.log("Error in Register api", error)
    return NextResponse.json<ApiResponse>({
      success:false,
      message:"Somthing went wrong", error:{
        error
      }
    },{status:500})
  }
  
}

