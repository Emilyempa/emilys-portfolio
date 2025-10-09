
import { Github } from "lucide-react";

export const Header = () => {
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-primary/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded"
            aria-label="Scroll to top of page"
          >
            <h1 className="text-xl font-bold text-primary retro-glow">Emily's Portfolio</h1>
          </a>
        </div>
        <nav className="flex items-center space-x-6" role="navigation" aria-label="Main navigation">
          <a 
            href="#skills" 
            className="text-sm font-medium hover:text-accent transition-colors hover:retro-glow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Go to Skills section"
          >
            Skills
          </a>
          <a 
            href="#projects" 
            className="text-sm font-medium hover:text-primary transition-colors hover:retro-glow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Go to Projects section"
          >
            Projects
          </a>
          <a 
            href="#contact" 
            className="text-sm font-medium hover:text-secondary transition-colors hover:retro-glow focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Go to Contact section"
          >
            Contact
          </a>
          <a 
            href="https://github.com/Emilyempa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent/20 hover:text-accent h-10 w-10 retro-border hover:shadow-lg hover:shadow-accent/30"
            aria-label="Visit Emily's GitHub profile (opens in new tab)"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
};
