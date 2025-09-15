const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full stack developer with over 5 years of experience creating 
              digital solutions that make a difference. My journey in tech started with a 
              curiosity for problem-solving and has evolved into a career dedicated to 
              building beautiful, functional applications.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I specialize in modern web technologies and love working with React, Node.js, 
              and cloud platforms. When I'm not coding, you can find me exploring new 
              technologies, contributing to open source projects, or sharing knowledge 
              with the developer community.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {['Problem Solving', 'Team Collaboration', 'Continuous Learning', 'Innovation'].map((trait) => (
                <span 
                  key={trait}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="w-80 h-80 mx-auto bg-gradient-primary rounded-2xl shadow-large flex items-center justify-center">
              <div className="w-72 h-72 bg-card rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">JD</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Profile Picture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;