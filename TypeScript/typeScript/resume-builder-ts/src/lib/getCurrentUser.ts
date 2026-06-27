import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  
  try {

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if(!token) throw new Error("Token not found")

      const  decode = verifyToken(token)

      

      if(!decode) throw new Error("unauthorize");

      return decode.userId;
      
    
  } catch (error) {
    console.log("Something went wrong", error)
  }
}