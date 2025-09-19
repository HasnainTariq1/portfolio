import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Code, Trash2 } from "lucide-react";
import { useSkillsWithCategories, useCreateSkillCategory, useCreateSkill, useDeleteSkill, useDeleteSkillCategory } from "@/hooks/useSkills";
import { useToast } from "@/hooks/use-toast";

const AdminSkills = () => {
  const { data: categories = [] } = useSkillsWithCategories();
  const createCategory = useCreateSkillCategory();
  const createSkill = useCreateSkill();
  const deleteSkill = useDeleteSkill();
  const deleteCategory = useDeleteSkillCategory();
  const { toast } = useToast();

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ title: "", order_index: 0 });
  const [skillForm, setSkillForm] = useState({ 
    category_id: "", 
    name: "", 
    proficiency: 4,
    order_index: 0 
  });

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createCategory.mutateAsync({
        ...categoryForm,
        order_index: categories.length,
      });
      toast({ title: "Success", description: "Category created successfully!" });
      setIsCategoryDialogOpen(false);
      setCategoryForm({ title: "", order_index: 0 });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      });
    }
  };

  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skillForm.category_id) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const selectedCategory = categories.find(cat => cat.id.toString() === skillForm.category_id);
      const skillsInCategory = selectedCategory?.skills || [];
      
      await createSkill.mutateAsync({
        category_id: parseInt(skillForm.category_id),
        name: skillForm.name,
        proficiency: skillForm.proficiency,
        order_index: skillsInCategory.length,
      });
      
      toast({ title: "Success", description: "Skill created successfully!" });
      setIsSkillDialogOpen(false);
      setSkillForm({ category_id: "", name: "", proficiency: 4, order_index: 0 });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create skill",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      await deleteSkill.mutateAsync(id);
      toast({ title: "Success", description: "Skill deleted successfully!" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory.mutateAsync(id);
      toast({ title: "Success", description: "Category deleted successfully!" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Skills & Categories</h3>
          <p className="text-sm text-muted-foreground">Manage your skills and skill categories</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category-title">Category Title</Label>
                  <Input
                    id="category-title"
                    value={categoryForm.title}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Frontend, Backend, Tools"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="bg-gradient-primary hover:opacity-90"
                    disabled={createCategory.isPending}
                  >
                    Create Category
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateSkill} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skill-category">Category</Label>
                  <Select value={skillForm.category_id} onValueChange={(value) => 
                    setSkillForm(prev => ({ ...prev, category_id: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skill-name">Skill Name</Label>
                  <Input
                    id="skill-name"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., React, Node.js, Docker"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skill-proficiency">Proficiency (1-5)</Label>
                  <Select 
                    value={skillForm.proficiency.toString()} 
                    onValueChange={(value) => 
                      setSkillForm(prev => ({ ...prev, proficiency: parseInt(value) }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Beginner</SelectItem>
                      <SelectItem value="2">2 - Novice</SelectItem>
                      <SelectItem value="3">3 - Intermediate</SelectItem>
                      <SelectItem value="4">4 - Advanced</SelectItem>
                      <SelectItem value="5">5 - Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="bg-gradient-primary hover:opacity-90"
                    disabled={createSkill.isPending}
                  >
                    Create Skill
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsSkillDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Code className="w-5 h-5" />
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    {category.skills?.length || 0} skills
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.skills?.map((skill) => (
                  <div 
                    key={skill.id}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < skill.proficiency ? 'bg-primary' : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="text-destructive hover:text-destructive ml-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSkills;