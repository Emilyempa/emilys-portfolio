
import { Github } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-primary retro-glow">Emily's Portfolio</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#skills" className="text-sm font-medium hover:text-accent transition-colors hover:retro-glow">
            Skills
          </a>
          <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors hover:retro-glow">
            Projects
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-secondary transition-colors hover:retro-glow">
            Contact
          </a>
          <a 
            href="https://github.com/Emilyempa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent/20 hover:text-accent h-10 w-10 retro-border hover:shadow-lg hover:shadow-accent/30"
          >
            <Github className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
};
