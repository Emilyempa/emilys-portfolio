
export const Hero = () => {
  return (
    <section 
      className="py-24 px-4 relative overflow-hidden"
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-pulse" aria-hidden="true"></div>
      <div className="container mx-auto text-center relative z-10">
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-6 retro-glow">
          Hi, I'm{" "}
          <span className="text-primary retro-glow">Emily Pettersson</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4 retro-glow">
          Software Developer
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          I am a driven software development student and I thrive on continuous
          learning and love challenging myself to improve with every project I
          take on. I have one year of experience in full-stack development, and
          this term I will be focusing on Java.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Hero actions">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 transition-all retro-border hover:shadow-lg hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="View my portfolio projects"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md border border-secondary bg-background hover:bg-secondary/20 hover:text-secondary h-11 px-8 transition-all retro-border hover:shadow-lg hover:shadow-secondary/30 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Contact me for opportunities"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};
