import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import thesisProjectImage from "@/assets/thesis-project-system-design.jpg";

const projects = [
  {
    title: "Thesis Project – User‑Centered OOAD System",
    description:
      "A final thesis project where I developed a complete system using a user‑centered and object‑oriented approach. The work included project planning, creating OOAD models (use‑case, activity, and class diagrams), designing the system, and implementing the final solution. The project concluded with a written report documenting the full development process.",
    tech: ["Next.js", "Tailwind", "Java", "Spring Boot", "JWT Tokens", "Docker", "MySQL"],
    github: "https://github.com/Emilyempa/exam-project-doggydaycare",
    demo: null,
    image: thesisProjectImage,
  },
  {
    title: "Wordle Clone",
    description:
      "A Fullstack recreation of the popular word puzzle game with MongoDB Atlas database for highscore functionality, and an intuitive game interface. The project has been tested with Cypress for comprehensive end-to-end (E2E) testing.",
    tech: [
      "React",
      "Vite",
      "JavaScript",
      "MUI",
      "CSS",
      "MongoDB Atlas",
      "Node.js",
      "Express",
    ],
    github: "https://github.com/Emilyempa/wordle",
    demo: "https://fullstack-wordle-n48o.onrender.com/",
    image:
      "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Dog Training Tracker",
    description:
      "A Fullstack application for managing dogs and their training sessions with secure role-based access. Users can log-in, view, and track their own dogs and trainings, while admins have full oversight of all data. The app provides both REST endpoints and a browser interface for easy interaction.",
    tech: ["Spring Boot", "Java", "Spring Data JPA", "MySQL", "Spring Security", "Docker Compose", "Thymeleaf"],
    github: "https://github.com/Emilyempa/dog-training-tracker",
    demo: null,
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary retro-glow">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a
            different aspect of my development journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all retro-card"
            >
              <div className="aspect-video overflow-hidden border-b border-primary/30">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-primary">
                  {project.title}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-secondary/80 transition-colors hover:retro-glow"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-secondary/20 text-secondary rounded-md border border-secondary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${project.demo ? 'flex-1' : 'w-full'} inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm transition-all retro-border hover:shadow-lg hover:shadow-primary/30`}
                  >
                    View Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center rounded-md border border-secondary bg-background hover:bg-secondary/20 hover:text-secondary h-9 px-4 py-2 text-sm transition-all retro-border hover:shadow-lg hover:shadow-secondary/30"
                    >
                      Visit Site
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
