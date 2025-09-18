import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { useProfile } from "@/hooks/useProfile";

const Index = () => {
  const { data: profile } = useProfile();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg font-medium mb-2">
            {profile?.name || "Hasnain"}
          </p>
          <p className="text-background/70">
            © 2025 All rights reserved. Hasnain Tariq.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;