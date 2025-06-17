import express from 'express';
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from '../controllers/projectControllers.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated, createProject);
router.get('/', isAuthenticated, getProjects);
router.put('/:id', isAuthenticated, updateProject);
router.delete('/:id', isAuthenticated, deleteProject);

export default router;