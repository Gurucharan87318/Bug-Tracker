import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  const { title, description } = req.body;
  const project = await Project.create({
    title,
    description,
    createdBy: req.user._id,
    teamMembers: [req.user._id],
  });
  res.status(201).json(project);
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({ teamMembers: req.user._id });
  res.json(projects);
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  if (!project.createdBy.equals(req.user._id)) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  if (!project.createdBy.equals(req.user._id)) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await project.remove();
  res.json({ message: 'Project deleted' });
};