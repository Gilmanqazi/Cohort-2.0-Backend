export interface GenerateSummaryBody {
  experienceLevel: string;
  skills: string[];
  jobTitle: string;
}

export interface GenerateSkillsBody {
  experienceLevel: string;
  jobTitle: string;
}

export interface GenerateProjectDesc {
  experienceLevel: string;
  jobTitle: string;
  techStack: string[];
}

export interface GenerateExperienceDesc {
  experienceLevel: string;
  yearOfExperience:number;
  techStack: string[];
  jobRole:string;
}

