import Project from "../models/Project.js";

/**
 * Get all projects (optionally filtered)
 */
export const getProjects = async (req, res, next) => {
  try {
    const { featured } = req.query;
    
    const query = featured ? { featured: true } : {};
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .select("-__v");
    
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single project by ID
 */
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findById(id).select("-__v");
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new project (admin only)
 */
export const createProject = async (req, res, next) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    
    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: savedProject,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a project (admin only)
 */
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a project (admin only)
 */
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
