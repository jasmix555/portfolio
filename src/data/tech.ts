export type TechItem = { name: string; icon: string; duration: string };
export type TechGroup = { group: string; items: TechItem[] };

export const techGroups: TechGroup[] = [
  {
    group: "Coding / Programming",
    items: [
      { name: "HTML", icon: "devicon-html5-plain colored", duration: "3 Year" },
      { name: "SCSS", icon: "devicon-sass-original colored", duration: "3 Year" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored", duration: "2 Year" },
      { name: "React", icon: "devicon-react-original colored", duration: "1 Year" },
      { name: "Next.js", icon: "devicon-nextjs-plain", duration: "1 Year" },
      { name: "PHP", icon: "devicon-php-plain colored", duration: "5 Months" },
    ],
  },
  {
    group: "Design",
    items: [
      { name: "Illustrator", icon: "devicon-illustrator-plain colored", duration: "2 Year" },
      { name: "Photoshop", icon: "devicon-photoshop-plain colored", duration: "2 Year" },
      { name: "Figma", icon: "devicon-figma-plain colored", duration: "1 Year" },
      { name: "Adobe XD", icon: "devicon-xd-plain colored", duration: "2 Year" },
    ],
  },
  {
    group: "Hosting",
    items: [
      { name: "GitHub", icon: "devicon-github-original", duration: "1 Year" },
      { name: "Vercel", icon: "devicon-vercel-original", duration: "9 Months" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Firebase", icon: "devicon-firebase-plain colored", duration: "8 Months" },
      { name: "Supabase", icon: "devicon-supabase-plain colored", duration: "2 Months" },
      { name: "Prisma", icon: "devicon-prisma-original colored", duration: "2 Months" },
      { name: "SQL", icon: "devicon-mysql-original colored", duration: "2 Months" },
      { name: "XAMPP", icon: "devicon-xampp-plain", duration: "3 Months" },
    ],
  },
];
