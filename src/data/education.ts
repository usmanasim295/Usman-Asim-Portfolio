export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export const education: EducationEntry[] = [
  {
    id: "riphah",
    degree: "Associate Degree in Computer Science",
    institution: "Riphah International University",
    location: "Lahore, Pakistan",
    startDate: "Sep 2023",
    endDate: "Aug 2025",
    gpa: "3.6",
  },
];
