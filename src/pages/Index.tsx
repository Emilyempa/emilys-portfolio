
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";

const Index = () => {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" role="main">
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </AccessibilityProvider>
  );
};

export default Index;
