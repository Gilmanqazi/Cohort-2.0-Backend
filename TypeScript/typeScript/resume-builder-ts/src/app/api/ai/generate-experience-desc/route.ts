import { generateAiContent } from "@/lib/gemini";
import { GenerateExperienceDesc } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  
  try {

    const body:GenerateExperienceDesc = await req.json()

    const {experienceLevel, yearOfExperience, techStack, jobRole} = body;

    if(!experienceLevel || !yearOfExperience || !techStack || !jobRole) return NextResponse.json<ApiResponse>({
success:false,
message:"Missing Fields"
    },{status:400})

    const prompt = `
    You are an expert resume writer and ATS optimization specialist.

    Generate a collection of high-impact professional bullet points describing a project based on the details provided below.

    Job Role:
    ${jobRole}

    Experience Level:
    ${experienceLevel}

    Years of Experience:
    ${yearOfExperience}

    Tech Stack Used in Project:
    ${techStack}

    Strict Rules:
    1. Output ONLY the bullet points for the project description. Do not include introductory text, titles, greetings, or concluding remarks.
    2. Generate exactly 3 to 4 high-impact bullet points.
    3. Start each bullet point directly with a strong action verb in the past tense (e.g., Developed, Engineered, Optimized). Do not use personal pronouns.
    4. Calibrate the technical complexity, scope, and impact of the project to accurately reflect a ${experienceLevel} role with ${yearOfExperience} of experience.
    5. Seamlessly integrate the provided tech stack keywords across the bullet points to maximize ATS readability.
    6. Use standard markdown bullet points (starting with '* ') but do not use any bolding or italics inside the text itself.
`;
const result = await generateAiContent(prompt)

let WorkExperienceDescription = result


if(typeof WorkExperienceDescription === "string"){
  try {

    WorkExperienceDescription = JSON.parse(WorkExperienceDescription)
    
  } catch (error) {
    console.error("Failed to parse skills", error)
  }
}

return NextResponse.json<ApiResponse>({
  success:true,
  message:" Work Experience Desc created",
  data:{
    WorkExperienceDescription
  }
},{status:201})

    
  } catch (error) {
    console.log("Error in Work Experience Desc Generation Api",error)

    return NextResponse.json<ApiResponse>({
success:false,
message:"Something went wrong"
    },{status:500})
  }

}