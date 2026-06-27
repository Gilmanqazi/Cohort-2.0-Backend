import { generateAiContent } from "@/lib/gemini";
import { GenerateProjectDesc } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  
  try {

    const body:GenerateProjectDesc = await req.json()

    const {experienceLevel, jobTitle, techStack} = body;

    if(!experienceLevel || !jobTitle || !techStack) return NextResponse.json<ApiResponse>({
success:false,
message:"Missing Fields"
    },{status:400})

    const prompt = `
    You are an expert resume writer and ATS optimization specialist.

    Generate a collection of high-impact professional bullet points describing a project based on the details provided below.

    Job Title:
    ${jobTitle}

    Experience Level:
    ${experienceLevel}

    Tech Stack Used in Project:
    ${techStack}

    Strict Rules:
    1. Output ONLY the bullet points for the project description. Do not include introductory text, titles, greetings, or concluding remarks (e.g., do not write "Here are your bullet points:").
    2. Generate exactly 3 to 4 high-impact bullet points.
    3. Start each bullet point directly with a strong action verb (e.g., Developed, Engineered, Optimized, Architected) in the past tense. Do not use personal pronouns.
    4. Seamlessly integrate the provided tech stack keywords across the bullet points to maximize ATS readability.
    5. Frame the accomplishments using an impact-driven approach (focusing on performance, scalability, optimization, or user experience relevant to the experience level).
    6. Use standard markdown bullet points (starting with a single asterisks '* ') but do not use any bolding or italics inside the text itself.
`;
const result = await generateAiContent(prompt)

let ProDesc = result


if(typeof ProDesc === "string"){
  try {

    ProDesc = JSON.parse(ProDesc)
    
  } catch (error) {
    console.error("Failed to parse skills", error)
  }
}

return NextResponse.json<ApiResponse>({
  success:true,
  message:" Project Desc created",
  data:{
    ProDesc
  }
},{status:201})

    
  } catch (error) {
    console.log("Error in Project Desc Generation Api",error)

    return NextResponse.json<ApiResponse>({
success:false,
message:"Something went wrong"
    },{status:500})
  }

}