import { useAuth, useSignOut } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, User, FileText, Briefcase, Code, Mail, MessageSquare, Settings } from "lucide-react";
import AdminProfile from "@/components/admin/AdminProfile";
import AdminAbout from "@/components/admin/AdminAbout";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminSkills from "@/components/admin/AdminSkills";
import AdminContact from "@/components/admin/AdminContact";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminServices from "@/components/admin/AdminServices";

const Admin = () => {
  const { data: user, isLoading } = useAuth();
  const signOut = useSignOut();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/admin/login';
    return null;
  }

  const handleSignOut = () => {
    signOut.mutate();
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-card shadow-soft border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-heading bg-gradient-primary bg-clip-text text-transparent">
            Portfolio Admin
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.email}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSignOut}
              disabled={signOut.isPending}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Content Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-6">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  About
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Services
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Messages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <AdminProfile />
              </TabsContent>
              
              <TabsContent value="about">
                <AdminAbout />
              </TabsContent>
              
              <TabsContent value="services">
                <AdminServices />
              </TabsContent>
              
              <TabsContent value="projects">
                <AdminProjects />
              </TabsContent>
              
              <TabsContent value="skills">
                <AdminSkills />
              </TabsContent>
              
              <TabsContent value="contact">
                <AdminContact />
              </TabsContent>
              
              <TabsContent value="messages">
                <AdminMessages />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;