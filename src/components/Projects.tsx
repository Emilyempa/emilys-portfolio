
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";

const projects = [
  {
    title: "Mock Cinema",
    description: "A team project that simulates a cinema experience with movie listings, showtimes, ticket booking functionality, and user authentication with login capabilities.",
    tech: ["Next.js", "TypeScript", "MUI", "Tailwind CSS"],
    github: "https://github.com/Emilyempa/mock-cinema",
    demo: "#",
    image: "https://images.unsplash.com/photo-1489599749064-2e62b36a2a97?w=600&h=400&fit=crop"
  },
  {
    title: "To-Do App",
    description: "A clean and intuitive task management application with features like task creation, completion tracking, and local storage persistence.",
    tech: ["JavaScript", "CSS", "HTML"],
    github: "https://github.com/Emilyempa/to-do-app",
    demo: "#",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop"
  },
  {
    title: "Wordle Clone",
    description: "A recreation of the popular word puzzle game with daily challenges, statistics tracking, MongoDB Atlas database for highscore functionality, and an intuitive game interface.",
    tech: ["React", "JavaScript", "MUI", "CSS", "MongoDB Atlas"],
    github: "https://github.com/Emilyempa/wordle",
    demo: "#",
    image: "https://images.unsplash.com/photo-1486237499506-c15a630ad6a1?w=600&h=400&fit=crop"
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary retro-glow">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a different aspect of my development journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all retro-card">
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
                    className="flex-1 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm transition-all retro-border hover:shadow-lg hover:shadow-primary/30"
                  >
                    View Code
                  </a>
                  <a 
                    href={project.demo}
                    className="flex-1 inline-flex items-center justify-center rounded-md border border-secondary bg-background hover:bg-secondary/20 hover:text-secondary h-9 px-4 py-2 text-sm transition-all retro-border hover:shadow-lg hover:shadow-secondary/30"
                  >
                    Live Demo
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
