'use client';

import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@utils/api';
import { useProject } from '@state/useProject';

// Define the Project type with the required 'description' property
interface Project {
  _id: string;
  title: string;
  description: string; // Ensure this matches the expected type in useProject
}

export default function ProjectSelector() {
  // Ensure React Query fetches the correct typed data
  const { data: projects, isLoading, isError } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const { selectedProject, setSelectedProject } = useProject();

  return (
    <div className="space-y-2 max-w-xs">
      <label className="font-medium">Select Project:</label>
      <select
        className="w-full border px-3 py-2 rounded"
        value={selectedProject?._id || ''}
        onChange={(e) => {
          // Ensure selected project includes the 'description' field
          const selected = projects?.find((p: Project) => p._id === e.target.value);
          if (selected) setSelectedProject(selected);
        }}
        disabled={isLoading}
      >
        <option value="" disabled>
          {isLoading ? 'Loading...' : 'Select a project'}
        </option>
        {projects?.map((project) => (
          <option key={project._id} value={project._id}>
            {project.title}
          </option>
        ))}
      </select>
      {isError && <p className="text-red-500 text-sm">Failed to load projects.</p>}
    </div>
  );
}