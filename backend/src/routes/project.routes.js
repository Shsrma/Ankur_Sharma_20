import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { validateProject, handleValidationErrors } from "../middleware/validation.js";

const router = express.Router();

// Public routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Protected routes (would need auth middleware in production)
router.post("/", validateProject, handleValidationErrors, createProject);
router.put("/:id", validateProject, handleValidationErrors, updateProject);
router.delete("/:id", deleteProject);

export default router;
