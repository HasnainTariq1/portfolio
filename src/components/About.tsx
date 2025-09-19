import { useAbout } from "@/hooks/useAbout";
import { useProfile } from "@/hooks/useProfile";

const About = () => {
  const { data: about } = useAbout();
  const { data: profile } = useProfile();
  
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {about?.content || `I m Hasnain Tariq, a passionate Machine Learning & AI Engineer with hands-on experience in NLP, Large Language Models, RAG, LangChain, LangGraph, and Agentic AI. I started my journey as a Backend Developer with Django and have since transitioned into building intelligent, scalable AI-powered solutions that bridge backend systems with advanced ML pipelines.`}
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              {(about?.traits || ['Problem Solving', 'Team Collaboration', 'Continuous Learning', 'Innovation']).map((trait) => (
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
              <div className="w-72 h-72 bg-card rounded-xl flex items-center justify-center p-2 bg-white">
                <div className="w-full h-full  rounded-lg overflow-hidden ">
                  {/* <div className="w-60 h-60 mx-auto mb-4 rounded-lg overflow-hidden border-8 border-blue-500 shadow-lg"> */}
                    <img 
                      src={profile?.hero_image_url || "https://kwntuzpcuihztgfentpf.supabase.co/storage/v1/object/public/portfolio-images/hero-profile.jpg"}
                      alt={profile?.name || "Profile"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://kwntuzpcuihztgfentpf.supabase.co/storage/v1/object/public/portfolio-images/hero-profile.jpg";
                      }}
                    />
                  {/* </div> */}
                  {/* <p className="text-sm text-muted-foreground">Profile Picture</p> */}
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