import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { useContactInfo, useSubmitMessage } from "@/hooks/useContact";
import { useToast } from "@/hooks/use-toast";

const iconMap = {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
};

const Contact = () => {
  const { data: contactInfo = [] } = useContactInfo();
  const submitMessage = useSubmitMessage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitMessage.mutateAsync(formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Fallback contact info
  const defaultContactInfo = [
    { id: 1, type: 'contact', icon: 'Mail', label: "Email", value: "hasnain@example.com", href: "mailto:hasnain@example.com", order_index: 0, created_at: "" },
    { id: 2, type: 'contact', icon: 'Phone', label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567", order_index: 1, created_at: "" },
    { id: 3, type: 'contact', icon: 'MapPin', label: "Location", value: "San Francisco, CA", href: "#", order_index: 2, created_at: "" }
  ];

  const defaultSocialLinks = [
    { id: 4, type: 'social', icon: 'Github', label: "GitHub", value: "GitHub", href: "#", order_index: 0, created_at: "" },
    { id: 5, type: 'social', icon: 'Linkedin', label: "LinkedIn", value: "LinkedIn", href: "#", order_index: 1, created_at: "" },
    { id: 6, type: 'social', icon: 'Twitter', label: "Twitter", value: "Twitter", href: "#", order_index: 2, created_at: "" }
  ];

  const displayContactInfo = contactInfo.length > 0 
    ? contactInfo.filter(item => item.type === 'contact')
    : defaultContactInfo;
    
  const displaySocialLinks = contactInfo.length > 0
    ? contactInfo.filter(item => item.type === 'social')  
    : defaultSocialLinks;

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Ready to start your next project? Let's work together to create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-soft hover:shadow-medium transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      placeholder="Your Name" 
                      className="border-muted"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      className="border-muted"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Input 
                    placeholder="Subject" 
                    className="border-muted"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Message" 
                    rows={6}
                    className="border-muted resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity duration-300"
                  size="lg"
                  disabled={submitMessage.isPending}
                >
                  {submitMessage.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {displayContactInfo.map((item) => {
                  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors duration-200 group"
                    >
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {displaySocialLinks.map((social) => {
                    const IconComponent = iconMap[social.icon as keyof typeof iconMap];
                    return (
                      <a
                        key={social.id}
                        href={social.href}
                        className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 group"
                        aria-label={social.label}
                      >
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;