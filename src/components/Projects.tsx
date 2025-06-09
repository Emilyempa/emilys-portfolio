
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";

const projects = [
  {
    title: "Mock Cinema",
    description: "A movie theater application that simulates a cinema experience with movie listings, showtimes, and ticket booking functionality.",
    tech: ["React", "JavaScript", "CSS"],
    github: "https://github.com/yourusername/mock-cinema",
    demo: "#",
    image: "https://images.unsplash.com/photo-1489599510139-46b6b3f88b04?w=600&h=400&fit=crop"
  },
  {
    title: "To-Do App",
    description: "A clean and intuitive task management application with features like task creation, completion tracking, and local storage persistence.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yourusername/to-do-app",
    demo: "#",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop"
  },
  {
    title: "Wordle Clone",
    description: "A recreation of the popular word puzzle game Wordle with daily challenges, statistics tracking, and an intuitive game interface.",
    tech: ["React", "JavaScript", "CSS"],
    github: "https://github.com/yourusername/wordle",
    demo: "#",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=400&fit=crop"
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a different aspect of my development journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {project.title}
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
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
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
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
                    className="flex-1 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm transition-colors"
                  >
                    View Code
                  </a>
                  <a 
                    href={project.demo}
                    className="flex-1 inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 text-sm transition-colors"
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
