import { useSkillsWithCategories } from "@/hooks/useSkills";

const Skills = () => {
  const { data: skillCategories = [] } = useSkillsWithCategories();
  
  // Fallback data for when no skills are loaded yet
  const defaultSkills = [
    {
      id: 0,
      title: "Frontend",
      order_index: 0,
      created_at: "",
      skills: [
        { id: 0, category_id: 0, name: "React", proficiency: 4, order_index: 0, created_at: "" },
        { id: 1, category_id: 0, name: "TypeScript", proficiency: 4, order_index: 1, created_at: "" },
        { id: 2, category_id: 0, name: "Next.js", proficiency: 4, order_index: 2, created_at: "" },
        { id: 3, category_id: 0, name: "Tailwind CSS", proficiency: 5, order_index: 3, created_at: "" }
      ]
    },
    {
      id: 1,
      title: "Backend",
      order_index: 1,
      created_at: "",
      skills: [
        { id: 4, category_id: 1, name: "Node.js", proficiency: 4, order_index: 0, created_at: "" },
        { id: 5, category_id: 1, name: "Python", proficiency: 3, order_index: 1, created_at: "" },
        { id: 6, category_id: 1, name: "PostgreSQL", proficiency: 4, order_index: 2, created_at: "" }
      ]
    },
    {
      id: 2,
      title: "Tools & Cloud",
      order_index: 2,
      created_at: "",
      skills: [
        { id: 7, category_id: 2, name: "Docker", proficiency: 3, order_index: 0, created_at: "" },
        { id: 8, category_id: 2, name: "AWS", proficiency: 3, order_index: 1, created_at: "" },
        { id: 9, category_id: 2, name: "Git", proficiency: 5, order_index: 2, created_at: "" }
      ]
    }
  ];
  
  const displayCategories = skillCategories.length > 0 ? skillCategories : defaultSkills;

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
          {displayCategories.map((category, index) => (
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
                    key={typeof skill === 'object' ? skill.id : skill}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors duration-200"
                  >
                    <span className="font-medium">{typeof skill === 'object' ? skill.name : skill}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < (typeof skill === 'object' ? skill.proficiency : 4) ? 'bg-primary' : 'bg-muted'
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