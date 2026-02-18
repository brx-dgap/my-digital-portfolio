"use client";

import { useState } from "react";
import { Shield, Trash2, AlertTriangle, FileCode, Lock, Server, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteProject } from "@/app/actions/projects";
import { useAdmin } from "@/hooks/use-admin";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

// Map icon strings to Lucide components
const iconMap = {
  AlertTriangle: AlertTriangle,
  Shield: Shield,
  FileCode: FileCode,
  Lock: Lock,
  Server: Server,
  Users: Users
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { isAdmin } = useAdmin();
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Get the icon component based on the project's icon string
  const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Shield;

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      const result = await deleteProject(project.id);
      
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        setIsOpen(false);
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="bg-background border-primary/20 relative">
      {isAdmin && (
        <div className="absolute top-4 right-4 z-10">
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{project.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      
      <CardHeader>
        <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {Array.isArray(project.items) && project.items.map((item: string, i: number) => (
            <li key={i} className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
