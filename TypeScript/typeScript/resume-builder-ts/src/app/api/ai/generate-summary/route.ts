import { generateAiContent } from "@/lib/gemini";
import { GenerateSummaryBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  
  try {

    const body:GenerateSummaryBody = await req.json()

    const {experienceLevel, skills, jobTitle} = body;

    if(!experienceLevel || !skills || !jobTitle) return NextResponse.json<ApiResponse>({
success:false,
message:"Missong Fields"
    },{status:400})

    const prompt = `

    You are an expert resume writer and ATS optimization specialist.

    Generate a professional ATS-friendly resume summary based on the details below.

    Job title:
    ${jobTitle}

    Skills:
    ${skills}

    Experience Level:
    ${experienceLevel}

    Strict Rules:
    1. Output ONLY the resume summary paragraph. Do not include any introductory or concluding text, labels, or greetings (e.g., do not write "Here is your summary:").
    2. Keep the length between 3 to 4 sentences (approximately 50-70 words).
    3. Write in the third person, omitting pronouns (e.g., start directly with an action verb or professional title like "Results-driven Full-Stack Developer with...").
    4. Seamlessly integrate the provided skills as keywords to maximize ATS readability.
    5. Ensure the tone is highly professional, confident, and impact-oriented.
    6. Do not use any markdown formatting (like bolding or bullet points) inside the summary text itself.
`;


const result = await generateAiContent(prompt)

const summary = result


return NextResponse.json<ApiResponse>({
  success:true,
  message:"Summary created",
  data:{
    summary
  }
},{status:201})

    
  } catch (error) {
    console.log("Error in Generate Summary Api",error)

    return NextResponse.json<ApiResponse>({
success:false,
message:"Something went wrong"
    },{status:500})
  }

}