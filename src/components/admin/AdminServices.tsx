import { useState } from "react";
import { useServices, useCreateService, useUpdateService, useDeleteService } from "@/hooks/useServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ServiceForm {
  id?: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order_index: number;
}

const AdminServices = () => {
  const { data: services = [], isLoading } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const { toast } = useToast();

  const [editingService, setEditingService] = useState<ServiceForm | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [featuresInput, setFeaturesInput] = useState("");

  const emptyForm: ServiceForm = {
    title: "",
    description: "",
    icon: "🛠️",
    features: [],
    order_index: services.length
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const serviceData = {
        ...editingService,
        features: featuresInput.split(',').map(f => f.trim()).filter(Boolean)
      };

      if (isCreating) {
        await createService.mutateAsync(serviceData);
        toast({ title: "Service created successfully" });
      } else if (editingService.id) {
        await updateService.mutateAsync({ ...serviceData, id: editingService.id });
        toast({ title: "Service updated successfully" });
      }

      setEditingService(null);
      setIsCreating(false);
      setFeaturesInput("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFeaturesInput(service.features?.join(', ') || '');
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingService(emptyForm);
    setFeaturesInput("");
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingService(null);
    setIsCreating(false);
    setFeaturesInput("");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService.mutateAsync(id);
        toast({ title: "Service deleted successfully" });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete service",
          variant: "destructive"
        });
      }
    }
  };

  if (isLoading) {
    return <div>Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Services Management</h2>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </div>

      {editingService && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{isCreating ? "Create New Service" : "Edit Service"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={editingService.title}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      title: e.target.value
                    })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Icon (Emoji)</label>
                  <Input
                    value={editingService.icon}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      icon: e.target.value
                    })}
                    placeholder="🛠️"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    description: e.target.value
                  })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Features (comma-separated)</label>
                <Input
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Order Index</label>
                <Input
                  type="number"
                  value={editingService.order_index}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    order_index: parseInt(e.target.value) || 0
                  })}
                  min="0"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{service.icon}</span>
                <CardTitle>{service.title}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(service)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDelete(service.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              {service.features && service.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-2">
                Order: {service.order_index}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;