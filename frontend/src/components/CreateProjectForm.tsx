'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '@utils/api';

export default function CreateProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      setTitle('');
      setDescription('');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutate({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
      <h2 className="text-xl font-semibold">Create New Project</h2>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="Project description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create Project'}
      </button>
      {isError && (
        <p className="text-red-500 text-sm mt-2">
          {(error as Error)?.message || 'Something went wrong.'}
        </p>
      )}
    </form>
  );
}
