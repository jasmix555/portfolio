export type TechItem = { name: string; icon: string; duration: string };
export type TechGroup = { group: string; items: TechItem[] };

export const techGroups: TechGroup[] = [
  {
    group: "Coding / Programming",
    items: [
      { name: "HTML", icon: "devicon-html5-plain colored", duration: "3y 9m" },
      { name: "SCSS", icon: "devicon-sass-original colored", duration: "3y 2m" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored", duration: "2y" },
      { name: "React", icon: "devicon-react-original colored", duration: "1y 5m" },
      { name: "Next.js", icon: "devicon-nextjs-plain", duration: "1y 2m" },
      { name: "PHP", icon: "devicon-php-plain colored", duration: "3m" },
    ],
  },
  {
    group: "Design",
    items: [
      { name: "Illustrator", icon: "devicon-illustrator-plain colored", duration: "2y 6m" },
      { name: "Photoshop", icon: "devicon-photoshop-plain colored", duration: "2y 7m" },
      { name: "Figma", icon: "devicon-figma-plain colored", duration: "1y 6m" },
    ],
  },
  {
    group: "Hosting",
    items: [
      { name: "GitHub", icon: "devicon-github-original", duration: "1y 2m" },
      { name: "Vercel", icon: "devicon-vercel-original", duration: "9m" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Firebase", icon: "devicon-firebase-plain colored", duration: "8m" },
      { name: "SQL", icon: "devicon-mysql-original colored", duration: "2m" },
      { name: "XAMPP", icon: "devicon-xampp-plain", duration: "6m" },
    ],
  },
];
