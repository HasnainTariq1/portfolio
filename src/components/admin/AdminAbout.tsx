import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useAbout, useUpdateAbout } from "@/hooks/useAbout";
import { useToast } from "@/hooks/use-toast";

const AdminAbout = () => {
  const { data: about } = useAbout();
  const updateAbout = useUpdateAbout();
  const { toast } = useToast();
  
  const [content, setContent] = useState("");
  const [traits, setTraits] = useState<string[]>([]);
  const [newTrait, setNewTrait] = useState("");

  useEffect(() => {
    if (about) {
      setContent(about.content || "");
      setTraits(about.traits || []);
    }
  }, [about]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateAbout.mutateAsync({ content, traits });
      toast({
        title: "Success",
        description: "About section updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about section",
        variant: "destructive",
      });
    }
  };

  const addTrait = () => {
    if (newTrait.trim() && !traits.includes(newTrait.trim())) {
      setTraits(prev => [...prev, newTrait.trim()]);
      setNewTrait("");
    }
  };

  const removeTrait = (trait: string) => {
    setTraits(prev => prev.filter(t => t !== trait));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTrait();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section</CardTitle>
        <CardDescription>
          Update your about content and personal traits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="content">About Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write about yourself, your experience, and what you're passionate about..."
              rows={8}
            />
          </div>
          
          <div className="space-y-4">
            <Label>Personal Traits</Label>
            <div className="flex gap-2">
              <Input
                value={newTrait}
                onChange={(e) => setNewTrait(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a personal trait..."
              />
              <Button type="button" onClick={addTrait} variant="outline">
                Add
              </Button>
            </div>
            {traits.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {traits.map((trait, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2">
                    {trait}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => removeTrait(trait)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="bg-gradient-primary hover:opacity-90"
            disabled={updateAbout.isPending}
          >
            {updateAbout.isPending ? "Updating..." : "Update About"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminAbout;