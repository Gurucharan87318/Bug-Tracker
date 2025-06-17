import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

export const getProjects = async () => {
  const res = await API.get('/projects');
  return res.data;
};

export const createProject = async (data: { title: string; description: string }) => {
  const res = await API.post('/projects', data);
  return res.data;
};
