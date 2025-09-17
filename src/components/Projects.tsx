import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";

const Projects = () => {
  const { data: dbProjects = [] } = useProjects();
  
  // Fallback projects for when no projects are loaded yet
  const defaultProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      image_url: null,
      github_url: "#",
      live_url: "#",
      featured: true,
      order_index: 0,
      created_at: ""
    },
    {
      id: 2,
      title: "Task Management App", 
      description: "Collaborative project management tool with real-time updates, team chat, and advanced analytics.",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io", "Tailwind"],
      image_url: null,
      github_url: "#",
      live_url: "#",
      featured: true,
      order_index: 1,
      created_at: ""
    }
  ];
  
  const projects = dbProjects.length > 0 ? dbProjects : defaultProjects;
  
  const getProjectImage = (project: any, index: number) => {
    if (project.image_url) return project.image_url;
    
    const gradients = [
      "bg-gradient-to-br from-blue-400 to-purple-600",
      "bg-gradient-to-br from-green-400 to-blue-600", 
      "bg-gradient-to-br from-purple-400 to-pink-600",
      "bg-gradient-to-br from-orange-400 to-red-600"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            A showcase of my recent work and side projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="group hover:shadow-large transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 shadow-soft"
            >
              <div className={`h-48 relative overflow-hidden ${!project.image_url ? getProjectImage(project, index) : ''}`}
                style={project.image_url ? { backgroundImage: `url(${project.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => window.open(project.github_url, '_blank')}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary/90 hover:bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => window.open(project.live_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-heading">{project.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed text-justify">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;