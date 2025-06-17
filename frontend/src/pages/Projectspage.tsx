import ProjectSelector from '@/components/ProjectSelector';
import CreateProjectForm from '@/components/CreateProjectForm';  

export default function ProjectsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <ProjectSelector />
      <CreateProjectForm />
    </div>
  );
}
