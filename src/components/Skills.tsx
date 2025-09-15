const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Backend", 
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"]
    },
    {
      title: "Tools & Cloud",
      skills: ["Docker", "AWS", "Git", "CI/CD", "Figma"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold font-heading mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div 
                    key={skill}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors duration-200"
                  >
                    <span className="font-medium">{skill}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 4 ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;