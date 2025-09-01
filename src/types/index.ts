export interface Links {
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  links?: string[];
}

export interface Profile {
  name: string;
  title: string;
  email: string;
  links: Links;
  skills: string[];
  education: Education[];
  workExperience: WorkExperience[];
  projects: Project[];
}

export interface RankedProject extends Project {
  relevanceScore: number;
}
