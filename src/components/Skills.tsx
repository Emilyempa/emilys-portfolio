
import {
  Database,
  Globe,
  GitBranch,
  Server,
  Palette,
  Terminal,
} from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Globe,
    technologies: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS/SASS",      
      "MUI",
      "Tailwind CSS"
    ],
  },
  {
    category: "Backend",
    icon: Server,
    technologies: ["Node.js", "REST APIs", "Express.js"],
  },
  {
    category: "Database",
    icon: Database,
    technologies: ["MariaDB", "MongoDB", "Supabase"],
  },
  {
    category: "Tools & DevOps",
    icon: GitBranch,
    technologies: ["Git", "GitHub", "Docker", "VS Code", "Figma", "CI/CD"]
  },
  {
    category: "Design",
    icon: Palette,
    technologies: ["UI/UX Design", "Responsive Design", "Figma", "WCAG"],
  },
  {
    category: "Development",
    icon: Terminal,
    technologies: ["Agile", "Testing", "Debugging", "Jest", "Cypress"],
  },
];

export const Skills = () => {
  return (
    <section 
      id="skills" 
      className="py-24 px-4 relative"
      role="region"
      aria-labelledby="skills-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-accent/5" aria-hidden="true"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 id="skills-heading" className="text-3xl md:text-4xl font-bold mb-4 text-secondary retro-glow">
            Skills & Technologies
          </h2>         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <article
              key={skill.category}
              className="retro-card p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background"
              role="group"
              aria-labelledby={`skill-${index}-heading`}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="p-3 rounded-lg bg-primary/10 retro-border border-primary/30 group-hover:bg-primary/20 transition-colors"
                  aria-hidden="true"
                >
                  <skill.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 id={`skill-${index}-heading`} className="ml-3 text-lg font-semibold text-primary retro-glow">
                  {skill.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2" role="list" aria-label={`${skill.category} technologies`}>
                {skill.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-sm bg-muted/50 border border-accent/30 rounded-full text-muted-foreground hover:bg-accent/20 hover:text-accent hover:border-accent/50 transition-all duration-200"
                    role="listitem"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
