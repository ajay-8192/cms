const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/auth");
const Project = require("../models/project");
const ProjectController = require("../controllers/projectController");

// Fetch projects of users
router.get("/", authenticate, ProjectController.fetchProjects);

// Create new Project
router.post("/create", authenticate, ProjectController.createNewProject);

// router.post('/add-allowed-access', authenticate, ProjectController.addAllowedAccess);

// router.post('/provide-access', authenticate, ProjectController.provideAccess);

// Update settings
router.post("/settings", authenticate, ProjectController.editProjectSettings);

// Publish Project

// Delete project

//

module.exports = router;
