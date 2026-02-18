import ClientProjectAdmin from "@/components/client-project-admin"
import { getProjects } from "@/app/actions/projects"
import ProjectCard from "@/components/project-card"

export default async function ProjectsPage() {
  // Fetch projects directly using the server action.
  const projects = await getProjects(); 

  return (
    <div className="flex flex-col">
      {/* Admin section for adding new projects - only visible to admins */}
      <ClientProjectAdmin />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Projects</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                Comprehensive cybersecurity solutions to protect from evolving threats.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {/* Use the new ProjectCard component with delete functionality */}
            {Array.isArray(projects) && projects.map((project) => {
              if (!Array.isArray(project.items)) return null; 
              
              return (
                <ProjectCard 
                  key={project.id}
                  project={project}
                />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
