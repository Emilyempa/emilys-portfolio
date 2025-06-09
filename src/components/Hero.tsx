
export const Hero = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Hi, I'm <span className="text-primary">Emily Pettersson</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A passionate developer creating innovative web applications and interactive experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#projects" 
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 transition-colors"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};
