import { generateAiContent } from "@/lib/gemini";
import { GenerateSkillsBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  
  try {

    const body:GenerateSkillsBody = await req.json()

    const {experienceLevel, jobTitle} = body;

    if(!experienceLevel || !jobTitle) return NextResponse.json<ApiResponse>({
success:false,
message:"Missong Fields"
    },{status:400})

    const prompt = `
    You are an expert technical recruiter and ATS optimization specialist.

    Analyze the profile details below and generate a highly targeted list of core technical skills tailored to the role and experience level.

    Job Title:
    ${jobTitle}

    Experience Level:
    ${experienceLevel}

    Strict Rules:
    1. Output ONLY a single line of raw, comma-separated plain text.
    2. DO NOT wrap the output or individual skills in brackets, square brackets, quotes, or JSON formatting (e.g., do NOT output ["Skill1", "Skill2"] or "[\"Skill1\"]").
    3. The response must look exactly like this sample: React.js, Node.js, TypeScript, MongoDB
    4. Focus exclusively on hard technical skills, tools, programming languages, databases, frameworks, and architectures.
    5. Strictly EXCLUDE soft skills or generic phrases (e.g., "Teamwork", "Problem Solving").
    6. Match the complexity of the skills to the experience level provided.
    7. Do not use any markdown formatting (like bolding, italics, or bullet points).
`;

const result = await generateAiContent(prompt)

let skills = result


if(typeof skills === "string"){
  try {

    skills = JSON.parse(skills)
    
  } catch (error) {
    console.error("Failed to parse skills", error)
  }
}

return NextResponse.json<ApiResponse>({
  success:true,
  message:"Skills created",
  data:{
    skills
  }
},{status:201})

    
  } catch (error) {
    console.log("Error in Skill Generation Api",error)

    return NextResponse.json<ApiResponse>({
success:false,
message:"Something went wrong"
    },{status:500})
  }

}