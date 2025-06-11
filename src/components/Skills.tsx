
import { 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  GitBranch, 
  Server,
  Palette,
  Terminal
} from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Globe,
    technologies: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"]
  },
  {
    category: "Backend",
    icon: Server,
    technologies: ["Node.js", "Python", "Java", "REST APIs", "Express.js"]
  },
  {
    category: "Database",
    icon: Database,
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase"]
  },
  {
    category: "Mobile",
    icon: Smartphone,
    technologies: ["React Native", "Flutter", "iOS", "Android"]
  },
  {
    category: "Tools & DevOps",
    icon: GitBranch,
    technologies: ["Git", "GitHub", "Docker", "VS Code", "Figma", "npm"]
  },
  {
    category: "Languages",
    icon: Code,
    technologies: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"]
  },
  {
    category: "Design",
    icon: Palette,
    technologies: ["UI/UX Design", "Responsive Design", "Figma", "Adobe Creative Suite"]
  },
  {
    category: "Development",
    icon: Terminal,
    technologies: ["Agile", "Scrum", "Testing", "Debugging", "Version Control"]
  }
];

export const Skills = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-accent/5"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary retro-glow">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I work with to create 
            innovative and efficient solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className="retro-card p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-primary/10 retro-border border-primary/30 group-hover:bg-primary/20 transition-colors">
                  <skill.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-primary retro-glow">
                  {skill.category}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-sm bg-muted/50 border border-accent/30 rounded-full text-muted-foreground hover:bg-accent/20 hover:text-accent hover:border-accent/50 transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="retro-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-accent mb-4 retro-glow">
              Always Learning
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              As a passionate developer, I'm constantly exploring new technologies and expanding my skill set. 
              I believe in staying current with industry trends and best practices to deliver cutting-edge solutions. 
              My curiosity drives me to experiment with emerging frameworks, tools, and methodologies that can 
              enhance the development process and user experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
