import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import userModel from "@/models/user.model";
import { ApiResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  
  try {             

    await connectDB();

    const body:LoginBody = await req.json()

    const { email, password} = body

    if(!email || !password){
return NextResponse.json<ApiResponse>({
  success:false,
  message:"All fields are required",
},{
  status:400
})
}

const isExisted = await userModel.findOne({email})


if(!isExisted) return NextResponse.json<ApiResponse>({
success:false,
message:"User Not Found"
},{
  status:404
})

const matchPass = isExisted.comparePass(password)

if(!matchPass) return NextResponse.json<ApiResponse>({
  success:false,message:"Invalid Credentials"

},{status:401})

const token = generateToken({userId: isExisted._id.toString()})

const response = NextResponse.json<ApiResponse>({
success:true,message:"Login successfully",
data:{
  user:{
    _id:isExisted._id,
    name:isExisted.name,
    email:isExisted.email
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
    console.log("Error in Login api", error)
    return NextResponse.json<ApiResponse>({
      success:false,
      message:"Somthing went wrong", error:{
        error
      }
    },{status:500})
  }

}
