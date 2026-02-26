export interface Profile {
  name: string;
  title: string;
  affiliation: string;
  location: string;
  bio: string;
  photo: string;
  researchInterests: ResearchInterest[];
  education: Education[];
  researchVisits: ResearchVisit[];
  researchProjects: ResearchProject[];
  awards: Award[];
  languages: Language[];
  skills: Skills;
}

export interface ResearchVisit {
  institution: string;
  location: string;
  host?: string;
  description: string;
  dates: string;
}

export interface ResearchProject {
  years: string;
  code: string;
  role: string;
  institution?: string;
  title: string;
}

export interface ResearchInterest {
  name: string;
  description: string;
  icon: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year?: string;
  years?: string;
  gpa?: string;
}

export interface Award {
  title: string;
  organization: string;
  year?: string;
  years?: string;
  description: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Skills {
  programming: string[];
  ml: string[];
  dl: string[];
  llm: string[];
  mlops: string[];
  databases: string[];
  software: string[];
  os: string[];
}

export interface Publication {
  title: string;
  authors: string[];
  journal?: string;
  volume?: string;
  pages?: string;
  year: number;
  status: "published" | "accepted" | "submitted" | "in-preparation";
  doi?: string;
  note?: string;
}

export interface Conference {
  title: string;
  authors: string[];
  presenter?: string;
  event: string;
  location: string;
  date: string;
  year: number;
  role: "speaker" | "co-author";
}

export interface LecturerCourse {
  code: string;
  name: string;
  institution: string;
  semester: string;
  year: number;
}

export interface TACourse {
  name: string;
  institution: string;
  years: string;
}

export interface Teaching {
  lecturer: LecturerCourse[];
  ta: TACourse[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Social {
  emails: string[];
  links: SocialLink[];
  flagcounter: {
    url: string;
    img: string;
  };
  cv: {
    academic: string;
    professional: string;
  };
}

export interface NewsItem {
  date: string;
  title: string;
  description: string;
  tag: "conference" | "award" | "publication" | "research" | "education";
}
