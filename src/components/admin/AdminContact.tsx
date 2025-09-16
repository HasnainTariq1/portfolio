import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { useContactInfo, useCreateContactInfo } from "@/hooks/useContact";
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

const AdminContact = () => {
  const { data: contactInfo = [] } = useContactInfo();
  const createContactInfo = useCreateContactInfo();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "contact" as "contact" | "social",
    label: "",
    value: "",
    href: "",
    icon: "Mail",
    order_index: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createContactInfo.mutateAsync({
        ...formData,
        order_index: contactInfo.length,
      });
      toast({ title: "Success", description: "Contact info created successfully!" });
      setIsDialogOpen(false);
      setFormData({
        type: "contact",
        label: "",
        value: "",
        href: "",
        icon: "Mail",
        order_index: 0,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create contact info",
        variant: "destructive",
      });
    }
  };

  const contactItems = contactInfo.filter(item => item.type === 'contact');
  const socialItems = contactInfo.filter(item => item.type === 'social');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <p className="text-sm text-muted-foreground">Manage your contact details and social links</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact Info
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Contact Information</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value: "contact" | "social") => 
                  setFormData(prev => ({ ...prev, type: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contact">Contact Info</SelectItem>
                    <SelectItem value="social">Social Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, icon: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mail">Mail</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="MapPin">Map Pin</SelectItem>
                    <SelectItem value="Github">GitHub</SelectItem>
                    <SelectItem value="Linkedin">LinkedIn</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="Globe">Website</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="e.g., Email, GitHub"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Display Value</Label>
                  <Input
                    id="value"
                    value={formData.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="e.g., john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="href">Link/URL</Label>
                <Input
                  id="href"
                  value={formData.href}
                  onChange={(e) => setFormData(prev => ({ ...prev, href: e.target.value }))}
                  placeholder="e.g., mailto:john@example.com, https://github.com/johndoe"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-gradient-primary hover:opacity-90"
                  disabled={createContactInfo.isPending}
                >
                  Create Contact Info
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>{contactItems.length} items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contactItems.map((item) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>{socialItems.length} items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {socialItems.map((item) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminContact;